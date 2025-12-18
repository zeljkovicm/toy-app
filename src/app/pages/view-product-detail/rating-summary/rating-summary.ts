import { Component, input } from '@angular/core'
import { ReviewSummaryModel } from '../../../models/review-model'
import { StarRating } from '../../../components/star-rating/star-rating'

@Component({
  selector: 'app-rating-summary',
  standalone: true,
  imports: [StarRating],
  template: `
    @if (summary()) {
      <div class="flex items-center gap-8 mb-6 p-4 bg-gray-50 rounded-lg">

        <div class="flex flex-col items-center w-1/2">
          <div class="text-4xl font-bold text-gray-900 mb-1">
            {{ summary().averageRating.toFixed(2) }}
          </div>

          <app-star-rating
            [averageRating]="summary().averageRating" />

          <div class="text-sm text-gray-500">
            Na osnovu {{ summary().reviewCount }} recenzija
          </div>
        </div>

        <div class="flex-1">
          @for (b of summary().breakdown; track b.stars) {
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm w-4">{{ b.stars }}★</span>

              <div class="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                <div
                  class="bg-yellow-400 h-2 rounded-full"
                  [style.width.%]="(b.count / summary().reviewCount) * 100">
                </div>
              </div>

              <span class="text-sm w-8 text-right">
                {{ b.count }}
              </span>
            </div>
          }
        </div>

      </div>
    }
  `
})
export class RatingSummary {
  summary = input.required<ReviewSummaryModel>()
}