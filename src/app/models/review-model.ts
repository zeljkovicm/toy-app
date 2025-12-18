export interface ReviewModel {
    reviewId: number
    toyId: number
    userId: string
    userName: string
    title: string | null
    rating: number
    comment: string
    createdAt: string
}

export interface RatingBreakdown {
    stars: number
    count: number
}

export interface ReviewSummaryModel {
    toyId: number
    averageRating: number
    reviewCount: number
    breakdown: RatingBreakdown[]
}

export interface ReviewRequest {
    toyId: number
    title: string
    rating: number
    comment: string
}