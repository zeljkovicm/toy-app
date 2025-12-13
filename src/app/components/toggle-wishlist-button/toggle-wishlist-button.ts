import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ToyStore } from '../../store';
import { ProductModel } from '../../models/product-model';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon],
  template: `
    <button [class]="isInWishlist() ? '!text-red-500' : '!text-gray-400'" 
    (click)="$event.stopPropagation(); toggleWishlist(product())" 
    matIconButton 
    class="p-2 rounded-lg 
    bg-white shadow-md
    flex items-center justify-center
    cursor-pointer
    transition-all duration-200
    hover:scale-110 hover:shadow-lg">
      <mat-icon>{{isInWishlist() ? 'favorite' : 'favorite_border'}}</mat-icon>
    </button>
  `,
  styles: ``,
})
export class ToggleWishlistButton {
  product = input.required<ProductModel>()
  store = inject(ToyStore)
  isInWishlist = computed(() => this.store.wishListItems().find(p => p.toyId === this.product().toyId))
  toggleWishlist(product: ProductModel) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product)
    } else {
      this.store.addToWishlist(product)
    }
  }
}
