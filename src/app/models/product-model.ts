import { ReviewModel } from "./review-model"

export interface ProductModel {
    toyId: number
    name: string
    permalink: string
    description: string
    targetGroup: string
    productionDate: string
    price: number
    imageUrl: string
    ageGroup: AgeGroupModel
    type: ProductTypeModel
    quantity: number
    inStock?: boolean
    averageRating: number
    reviewCount: number
    reviews: ReviewModel[]
}

export interface AgeGroupModel {
    ageGroupId: number
    name: string
    description: string
}

export interface ProductTypeModel {
    typeId: number
    name: string
    description: string
}