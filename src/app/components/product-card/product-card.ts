import { Component, computed, inject, input, output } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { MatIcon } from "@angular/material/icon";
import { ToyStore } from '../../store';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-product-card',
  imports: [MatIcon, MatButton, RouterLink, StarRating, NgClass],
  template: `
    <div class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full" [routerLink]="['/products/details', product().toyId]">
          <img [src]="product().imageUrl" alt="" class="w-full h-[300px] object-cover rounded-t-xl" [style.view-transition-name]="'product-image-' + product().toyId">
          <ng-content></ng-content>
          <div class="p-5 flex flex-col flex-1">
            <h4 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {{product().name}}
            </h4>
            <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">{{product().description}}</p>
            <app-star-rating class="mb-3" [averageRating]="product().averageRating">({{product().reviewCount}})</app-star-rating>
            <div class="text-sm font-medium mb-4" [ngClass]="product().quantity > 0 ? 'text-green-600' : 'text-red-600'">{{product().quantity > 0 ? 'Na stanju' : 'Nije na stanju'}}</div>
            <div class="flex items-center justify-between mt-auto">
              <span class="text-2xl font-bold text-gray-900">
                RSD {{product().price}}
              </span>
              <button matButton="filled" [disabled]="product().quantity <= 0" class="flex items-center gap-2" (click)="$event.stopPropagation(); store.addToCart(product())">
                <mat-icon>shopping_cart</mat-icon>U korpu
              </button>
            </div>
          </div>
        </div>
  `,
  styles: ``,
})
export class ProductCard {
  product = input.required<ProductModel>()
  addToCartClicked = output<ProductModel>()

  store = inject(ToyStore)


}
