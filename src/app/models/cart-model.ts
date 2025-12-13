import { ProductModel } from "./product-model";

export interface CartModel {
    product: ProductModel
    quantity: number
}