import { CartModel } from "./cart-model"
import { ProductModel } from "./product-model"


export interface OrderItemModel {
    toyId: number
    quantity: number
    price: number
}

export interface OrderItemWithProduct {
    toyId: number
    quantity: number
    price: number
    product: ProductModel
}

export interface OrderViewModel extends OrderResponseModel {
    items: OrderItemWithProduct[]
}

export interface OrderCreateRequest {
    phone: string
    address: string
    city: string
    zip: string
    paymentType: 'visa' | 'mastercard' | 'cash'
    items: OrderItemModel[]
}

export interface OrderResponseModel {
    id: string
    total: number
    paymentType: string
    paymentStatus: string
    orderStatus: string
    deliveryStatus: string
    phone: string
    address: string
    city: string
    zip: string
    items: OrderItemModel[]
    updatedAt: string
    createdAt: string
}