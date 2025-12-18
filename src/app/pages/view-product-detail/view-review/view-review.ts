import { Component, computed, effect, inject, input, signal } from '@angular/core'
import { MatButton } from '@angular/material/button'

import { ProductModel } from '../../../models/product-model'
import { ReviewModel } from '../../../models/review-model'

import { ViewPanel } from '../../../directives/view-panel'
import { RatingSummary } from '../rating-summary/rating-summary'
import { ViewReviewItem } from '../view-review-item/view-review-item'
import { WriteReview } from '../write-review/write-review'

import { ToyStore } from '../../../store'
import { AuthStore } from '../../../auth-store'
import { ReviewService } from '../../../services/review.service'

@Component({
  selector: 'app-view-review',
  standalone: true,
  imports: [
    ViewPanel,
    RatingSummary,
    ViewReviewItem,
    MatButton,
    WriteReview,
  ],
  template: `
    <div appViewPanel>

      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Recenzije kupaca</h2>
        @if (auth.isAuthenticated()) {
          <button matButton="filled" (click)="$event.stopPropagation(); store.startReview(product().toyId)">
            Dodaj recenziju
          </button>
        }
      </div>
      @if (store.reviewingProductId() === product().toyId) {
        <app-write-review class="mb-6" [toyId]="product().toyId"/>
      }
      @if (store.reviewSummaryForSelectedProduct(); as summary) {
        <app-rating-summary [summary]="summary" />
      }
      <div class="flex flex-col gap-6">
        @for (review of sortedReviews(); track review.reviewId) {
          <app-view-review-item [review]="review" />
        }
      </div>
    </div>
  `,
})
export class ViewReview {
  store = inject(ToyStore)
  auth = inject(AuthStore)
  reviewService = inject(ReviewService)

  product = input.required<ProductModel>()

  reviews = signal<ReviewModel[]>([])
  loading = signal(false)

  constructor() {
    effect(() => {
      const toyId = this.product().toyId

      this.store.loadReviewSummary(toyId)

      this.reviewService.getReviewsById(toyId).subscribe(data => {
        this.reviews.set(data)
      })
    })
  }

  sortedReviews = computed(() =>
    [...this.reviews()].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
  )
}
