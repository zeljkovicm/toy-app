import { Component, inject, input, signal } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { StarRating } from "../../../components/star-rating/star-rating";
import { StockStatus } from "../stock-status/stock-status";
import { QuantitySelector } from "../../../components/quantity-selector/quantity-selector";
import { MatIcon } from "@angular/material/icon";
import { ToggleWishlistButton } from "../../../components/toggle-wishlist-button/toggle-wishlist-button";
import { TitleCasePipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ToyStore } from '../../../store';

@Component({
  selector: 'app-product-info',
  imports: [StarRating, StockStatus, QuantitySelector, MatIcon, ToggleWishlistButton, TitleCasePipe, MatIcon, MatIconButton, MatButton],
  template: `
  <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 w-fit mb-2">
    {{product().type.name | titlecase}}
    </div>
    <h1 class="text-2xl font-extrabold mb-3">{{product().name}}</h1>
    <app-star-rating class="mb-3" [averageRating]="product().averageRating">
      ({{product().averageRating.toFixed(2)}}) ({{product().reviewCount}} ocena)
    </app-star-rating>
    <p class="text-3xl font-extrabold mb-4">RSD {{product().price}}</p>
    <div class="mb-4">
      <app-stock-status [inStock]="product().inStock!"></app-stock-status>
    </div>

    <p class="font-semibold mb-2">Opis</p>
    <p class="text-gray-600 border-b border-gray-200 pb-4">{{product().description}}</p>
    <div class="flex items-center gap-2 mb-3 pt-4">
    <span class="font-semibold">Količina</span>
    <app-quantity-selector [quantity]="quantity()" (quantityUpdated)="onQuantityUpdated($event)">
    </app-quantity-selector>
  </div>
  <div class="flex gap-4 mb border-b border-gray-200 pb-4">
    <button matButton="filled" class="w-2/3 flex items-center gap-2" (click)="store.addToCart(product(), quantity())"
        [disabled]="!product().inStock">
        <mat-icon>shopping_cart</mat-icon>
        {{product().inStock ? 'Dodaj u korpu' : 'Nije na stanju'}}
    </button>
    <app-toggle-wishlist-button [product]="product()"></app-toggle-wishlist-button>
    <button matIconButton>
        <mat-icon>share</mat-icon>
    </button>
  </div>
  <div class="pt-6 flex flex-col gap-2 text-gray-700 text-xs">
    <div class="flex items-center gap-3">
        <mat-icon class="small">local_shipping</mat-icon>
        <span>Besplatna dostava za narudžbine iznad 3000 dinara</span>
    </div>
    <div class="flex items-center gap-3">
        <mat-icon class="small">autorenew</mat-icon>
        <span>30 dana za povrat</span>
    </div>
    <div class="flex items-center gap-3">
        <mat-icon class="small">shield</mat-icon>
        <span>Garancija 2 godine</span>
    </div>
  </div>
  `,
  styles: ``,
})
export class ProductInfo {
  product = input.required<ProductModel>()
  store = inject(ToyStore)
  quantity = signal(1)

  onQuantityUpdated(value: number) {
    if (value < 1) return
    this.quantity.set(value)
  }
}
