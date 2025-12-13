import { CartModel } from "./cart-model"

export interface OrderModel {
    id: string
    userId: string
    userEmail: string
    name: string
    phone: string
    address: string
    city: string
    zip: string
    total: number
    items: CartModel[]
    paymentType: string
    paymentStatus: 'success' | 'failure' | 'pending' | 'canceled'
    createdAt: string
}