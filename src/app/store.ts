import { computed, inject } from "@angular/core"
import { ProductModel } from "./models/product-model"
import { signalStore, withState, withComputed, withMethods, patchState, signalMethod } from '@ngrx/signals'
import { ProductService } from "./services/product.service"
import { produce } from 'immer'
import { Toaster } from "./services/toaster.service"
import { CartModel } from "./models/cart-model"
import { MatDialog } from "@angular/material/dialog"
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog"
import { AuthStore } from "./auth-store"
import { Router, RouterLink } from "@angular/router"
import { OrderItemWithProduct, OrderResponseModel, OrderViewModel } from "./models/order-model"
import { withStorageSync } from '@angular-architects/ngrx-toolkit'
import { OrderService } from "./services/order.service"
import { ReviewService } from "./services/review.service"
import { ReviewSummaryModel } from "./models/review-model"

export type ToyState = {
    products: ProductModel[]
    category: string
    wishListItems: ProductModel[]
    cartItems: CartModel[]
    loading: boolean
    selectedProductId: number | null
    writeReview: boolean
    checkoutForm: {
        name: string
        phone: string
        address: string
        city: string
        zip: string
        paymentType?: 'visa' | 'mastercard' | 'cash'
    } | null
    orderList: OrderResponseModel[],
    reviewSummary: Record<number, ReviewSummaryModel>
    reviewingProductId: number | null,
}

export const ToyStore = signalStore(
    { providedIn: 'root' },
    withState<ToyState>({
        products: [],
        category: 'svi',
        wishListItems: [],
        cartItems: [],
        loading: false,
        selectedProductId: null,
        writeReview: false,
        checkoutForm: null,
        orderList: [],
        reviewSummary: {},
        reviewingProductId: null,

    }),
    withStorageSync({
        key: 'toy-store',
        select: ({ category, wishListItems, cartItems }) => ({
            wishListItems,
            cartItems,
        }),
    }),
    withComputed(({ category, products, wishListItems, cartItems, selectedProductId, checkoutForm, orderList, reviewSummary }) => ({
        filteredProducts: computed(() => {
            if (category() === 'svi') return products()
            return products().filter((p) => p.type.name.toLowerCase() === category().toLowerCase())
        }),
        categories: computed(() => {
            const unique = Array.from(new Set(products().map(p => p.type.name)))
            return ['svi', ...unique]
        }),
        wishlistCount: computed(() => wishListItems().length),
        cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
        selectedProduct: computed(() => products().find((p) => p.toyId === selectedProductId())),
        hasCheckoutData: computed(() => !!checkoutForm()),
        enrichedOrders: computed<OrderViewModel[]>(() => {
            const productsMap = new Map(
                products().map(p => [p.toyId, p])
            )

            return orderList().map(order => ({
                ...order,
                items: order.items
                    .map(item => {
                        const product = productsMap.get(item.toyId)

                        if (!product) return null

                        return {
                            toyId: item.toyId,
                            quantity: item.quantity,
                            price: item.price,
                            product
                        }
                    })
                    .filter(Boolean) as OrderItemWithProduct[]
            }))
        }),
        reviewSummaryForSelectedProduct: computed(() => {
            const id = selectedProductId()
            if (!id) return null
            return reviewSummary()[id] ?? null
        })
    })),
    withMethods((store, productService = inject(ProductService), toaster = inject(Toaster), dialog = inject(MatDialog), authStore = inject(AuthStore), router = inject(Router), orderService = inject(OrderService), reviewService = inject(ReviewService)) => ({
        loadProducts: () => {
            patchState(store, { loading: true })

            productService.getEnrichedProducts().subscribe({
                next: (data) =>
                    patchState(store, {
                        products: data,
                        loading: false
                    }),
                error: (err) => {
                    patchState(store, { loading: false })
                    toaster.error('Greška pri učitavanju proizvoda')
                    console.error(err)
                }
            })
        },
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category })
        }),
        setProductId: signalMethod<number>((productId: number) => {
            patchState(store, { selectedProductId: productId })
        }),
        addToWishlist: (product: ProductModel) => {
            const updatedWishListItems = produce(store.wishListItems(), (draft) => {
                if (!draft.find(p => p.toyId === product.toyId)) {
                    draft.push(product)
                }
            })
            patchState(store, { wishListItems: updatedWishListItems })
            toaster.success("Proizvod je dodat u omiljene proizvode!")
        },
        removeFromWishlist: (product: ProductModel) => {
            patchState(store, { wishListItems: store.wishListItems().filter(p => p.toyId !== product.toyId) })
            toaster.success('Proizvod je uklonjen iz omiljenih proizvoda!')
        },
        clearWishList: () => {
            patchState(store, { wishListItems: [] })
        },
        addToCart: (product: ProductModel, quantity = 1) => {
            const existingItemIndex = store.cartItems().findIndex(i => i.product.toyId === product.toyId)
            const updateCartItems = produce(store.cartItems(), (draft) => {
                if (existingItemIndex !== -1) {
                    draft[existingItemIndex].quantity += quantity
                    return
                }

                draft.push({ product, quantity })
            })

            patchState(store, { cartItems: updateCartItems })
            toaster.success(existingItemIndex !== -1 ? 'Dodat još jedan!' : 'Proizvod dodat u korpu!')
        },
        setItemQuantity: (parameters: { productId: number, quantity: number }) => {
            const index = store.cartItems().findIndex(c => c.product.toyId === parameters.productId)
            const updated = produce(store.cartItems(), (draft) => {
                draft[index].quantity = parameters.quantity
            })

            patchState(store, { cartItems: updated })
        },
        addAllWishlistToCart: () => {
            const updatedCartItems = produce(store.cartItems(), (draft) => {
                store.wishListItems().forEach(p => {
                    if (!draft.find(c => c.product.toyId === p.toyId)) {
                        draft.push({ product: p, quantity: 1 })
                    }
                })
            })

            patchState(store, { cartItems: updatedCartItems, wishListItems: [] })
        },
        moveToWishlist: (product: ProductModel) => {
            const updatedCartItems = store.cartItems().filter(p => p.product.toyId !== product.toyId)
            const updatedWishListItems = produce(store.wishListItems(), (draft) => {
                if (!draft.find(p => p.toyId === product.toyId)) {
                    draft.push(product)
                }
            })

            patchState(store, { cartItems: updatedCartItems, wishListItems: updatedWishListItems })
        },
        removeFromCart: (product: ProductModel) => {
            patchState(store, { cartItems: store.cartItems().filter(c => c.product.toyId !== product.toyId) })
        },
        proceedToCheckout: () => {
            if (!authStore.isAuthenticated()) {
                dialog.open(SignInDialog, {
                    disableClose: true
                })
                return
            }

            router.navigate(['/checkout'])
        },
        placeOrder: () => {
            if (!authStore.isAuthenticated()) {
                toaster.error('Morate biti prijavljeni.')
                dialog.open(SignInDialog, { disableClose: true })
                return
            }

            const checkout = store.checkoutForm()

            if (!checkout) {
                toaster.error('Popunite podatke za narudžbinu.')
                return
            }

            if (!checkout.paymentType) {
                toaster.error('Izaberite način plaćanja.')
                return
            }

            if (store.cartItems().length === 0) {
                toaster.error('Korpa je prazna.')
                return
            }

            patchState(store, { loading: true })

            const orderRequest = {
                phone: checkout.phone,
                address: checkout.address,
                city: checkout.city,
                zip: checkout.zip,
                paymentType: checkout.paymentType,
                items: store.cartItems().map(item => ({
                    toyId: item.product.toyId,
                    quantity: item.quantity,
                    price: item.product.price,
                }))
            }

            orderService.createOrder(orderRequest).subscribe({
                next: (order) => {
                    patchState(store, {
                        loading: false,
                        cartItems: [],
                        checkoutForm: null,
                        orderList: [...store.orderList(), order],
                    })

                    router.navigate(['/order-success'])
                },
                error: (err) => {
                    patchState(store, { loading: false })
                    toaster.error(err?.error?.detail ?? 'Greška pri kreiranju narudžbine')
                }
            })
        },
        showWriteReview: () => { patchState(store, { writeReview: true }) },
        hideWriteReview: () => { patchState(store, { writeReview: false }) },
        setCheckoutForm: signalMethod<{ name: string; phone: string; address: string; city: string; zip: string }>((data) => {
            patchState(store, { checkoutForm: data })
        }),
        clearCheckoutForm: () => {
            patchState(store, { checkoutForm: null })
        },
        setPaymentType: signalMethod<'visa' | 'mastercard' | 'cash'>((paymentType) => {
            const current = store.checkoutForm()

            if (!current) return

            patchState(store, {
                checkoutForm: {
                    ...current,
                    paymentType,
                }
            })
        }),
        loadMyOrders: () => {
            orderService.getMyOrders().subscribe({
                next: (orders) => {
                    patchState(store, { orderList: orders })
                },
                error: () => {
                    toaster.error('Greška pri učitavanju narudžbina')
                }
            })
        },
        cancelOrder: (orderId: string) => {
            patchState(store, { loading: true })
            orderService.cancelOrder(orderId).subscribe({
                next: () => {
                    patchState(store, {
                        loading: false,
                        orderList: store.orderList().map(order =>
                            order.id === orderId
                                ? {
                                    ...order,
                                    orderStatus: 'canceled',
                                    deliveryStatus: 'canceled',
                                    paymentStatus: 'canceled'
                                }
                                : order
                        )
                    })
                    toaster.success('Narudžbina je otkazana')
                },
                error: (err) => {
                    patchState(store, { loading: false })
                    toaster.error(err?.error?.detail ?? 'Greška pri otkazivanju')
                }
            })
        },
        loadReviewSummary: (toyId: number) => {
            reviewService.getReviewSummary(toyId).subscribe({
                next: (summary) => {
                    patchState(store, {
                        reviewSummary: {
                            ...store.reviewSummary(),
                            [toyId]: summary
                        }
                    })
                },
                error: () => {
                    console.error('Greška pri učitavanju summary-a')
                }
            })
        },
        createReview: (payload: {
            toyId: number
            title: string
            rating: number
            comment: string
        }) => {
            patchState(store, { loading: true })

            reviewService.createReview(payload).subscribe({
                next: () => {
                    patchState(store, { loading: false, writeReview: false })

                    // refresh summary za taj proizvod
                    reviewService.getReviewSummary(payload.toyId).subscribe({
                        next: (summary) => {
                            patchState(store, {
                                reviewSummary: {
                                    ...store.reviewSummary(),
                                    [payload.toyId]: summary
                                }
                            })
                        }
                    })
                },
                error: (err) => {
                    patchState(store, { loading: false })
                    toaster.error(err?.error?.detail ?? 'Greška pri slanju recenzije')
                }
            })
        },
        startReview: (toyId: number) => {
            patchState(store, { reviewingProductId: toyId })
        },

        stopReview: () => {
            patchState(store, { reviewingProductId: null })
        },

    }))
)