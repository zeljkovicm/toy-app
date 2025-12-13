import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ToyStore } from '../../store';
import { ProductCard } from "../../components/product-card/product-card";
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
import { MatIcon } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { EmptyWishlist } from "./empty-wishlist/empty-wishlist";

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatAnchor, EmptyWishlist],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" label="Nastavite sa kupovinom" navigateTo="/products/svi" />
      @if (store.wishlistCount() > 0) {
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Moji omiljeni proizvodi</h1>
          <span class="text-gray-500 text-xl">Ukupno proizvoda: {{store.wishlistCount()}}</span>
        </div>

        <div class="responsive-grid">
          @for (product of store.wishListItems(); track product.toyId) {
          <app-product-card [product]="product">
          
          <button matIconButton class="!absolute top-3 right-3 z-10 text-gray-400 p-2 rounded-lg !bg-white shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
          (click) ="$event.stopPropagation(); store.removeFromWishlist(product)">
            <mat-icon>delete</mat-icon>
          </button>  
          </app-product-card>
          }
        </div>
        <div class="mt-8 flex justify-center">
          <button matButton="outlined" class="danger" (click)="store.clearWishList()">Ukloni sve prozivode</button>
        </div>
      }@else {
        <app-empty-wishlist />
      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(ToyStore)
}
