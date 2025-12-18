import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ReviewModel, ReviewRequest, ReviewSummaryModel } from '../models/review-model'

@Injectable({ providedIn: 'root' })
export class ReviewService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:8000/reviews'

    getReviewsById(toyId: number): Observable<ReviewModel[]> {
        return this.http.get<ReviewModel[]>(`${this.apiUrl}/${toyId}`)
    }

    getReviewSummary(toyId: number): Observable<ReviewSummaryModel> {
        return this.http.get<ReviewSummaryModel>(
            `${this.apiUrl}/${toyId}/summary`
        )
    }

    createReview(payload: ReviewRequest) {
        return this.http.post<ReviewModel>(this.apiUrl, payload)
    }
}