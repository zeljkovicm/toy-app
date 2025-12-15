import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ReviewModel, ReviewRequest } from '../models/review-model'

@Injectable({ providedIn: 'root' })
export class ReviewService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:8000/review'

    postReview(data: ReviewRequest): Observable<ReviewModel> {
        return this.http.post<ReviewModel>(`${this.apiUrl}/create`, data)
    }
}