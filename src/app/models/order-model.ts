import { CartModel } from "./cart-model"

export interface OrderModel {
    id: string
    userId: string
    userEmail: string
    total: number
    items: CartModel[]
    paymentStatus: 'success' | 'failure' | 'pending'
    createdAt: string
}