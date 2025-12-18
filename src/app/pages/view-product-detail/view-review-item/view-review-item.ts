import { Component, inject, input } from '@angular/core';
import { ReviewModel } from '../../../models/review-model';
import { ViewPanel } from "../../../directives/view-panel";
import { AuthStore } from '../../../auth-store';
import { StarRating } from "../../../components/star-rating/star-rating";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [ViewPanel, StarRating, DatePipe],
  template: `
    <div appViewPanel>
      <div class="flex gap-4">
        <div class="w-10 h-10 shrink-0">
          @if(false) {
            <img [src]="" class="w-10 h-10 rounded-full object-cover"/>
          } @else {
            <div class="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-semibold text-sm">
              {{ getInitials(review().userName) }}
            </div>
          }
        </div>
        <div class="flex-1">
          <div class="text-lg font-semibold mb-1">
            {{ review().userName }}
          </div>
        <div class="flex items-center gap-3 mb-2">
          <app-star-rating [averageRating]="review().rating" />
          <div class="text-sm text-gray-500">
            {{ review().createdAt | date: 'MMM d, yyyy' }}
          </div>
        </div>
        <div class="text-base font-semibold mb-1">{{review().title ? review().title : "Komentar"}}</div>
        <div class="text-sm text-gray-500">
          {{ review().comment }}
        </div>
      </div>
    </div>
  </div>

  `,
  styles: ``,
})
export class ViewReviewItem {
  review = input.required<ReviewModel>()
  auth = inject(AuthStore)

  getInitials(name: string | undefined): string {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase()
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }
}
