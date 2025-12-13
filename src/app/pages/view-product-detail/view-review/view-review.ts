import { Component, computed, inject, input } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummary } from "../rating-summary/rating-summary";
import { ViewReviewItem } from "../view-review-item/view-review-item";
import { MatButton } from '@angular/material/button';
import { ToyStore } from '../../../store';
import { WriteReview } from "../write-review/write-review";
import { AuthStore } from '../../../auth-store';

@Component({
  selector: 'app-view-review',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatButton, WriteReview],
  template: `
    <div appViewPanel>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Recenzije kupaca</h2>
        @if(auth.isAuthenticated()){
          <button matButton="filled" (click)="store.showWriteReview()">Dodaj recenziju</button>
        }
      </div>

      @if (store.writeReview()){
        <app-write-review class="mb-6"/>
      }
      <app-rating-summary [product]="product()"/>
      <div class="flex flex-col gap-6">
        @for (review of sortedReviews(); track review.reviewId) {
          <app-view-review-item [review]="review"/>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ViewReview {
  store = inject(ToyStore)
  auth = inject(AuthStore)
  product = input.required<ProductModel>()
  sortedReviews = computed(() => {
    const reviews = this.product().reviews ?? []

    return [...reviews].sort((a, b) => {
      const tb = new Date(b.createdAt).getTime()
      const ta = new Date(a.createdAt).getTime()
      return tb - ta
    })
  })
}
