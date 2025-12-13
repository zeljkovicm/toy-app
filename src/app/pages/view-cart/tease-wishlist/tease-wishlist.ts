import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ToyStore } from '../../../store';
import { MatButton } from '@angular/material/button';
import { ViewPanel } from '../../../directives/view-panel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tease-wishlist',
  imports: [MatIcon, MatButton, ViewPanel, RouterLink],
  template: `
    <div appViewPanel class="flex items-center justify-between">
    <div class="flex items-center gap-3">
        <mat-icon class="!text-red-500">favorite_border</mat-icon>
        <div class="">
            <h2 class="text-xl font-bold">Omiljeni proizvodi ({{store.wishlistCount()}})</h2>
            <p class="text-gray-500 text-sm">Sačuvani proizvodi: {{store.wishlistCount()}} </p>
        </div>
    </div>
    <div class="flex items-center gap-3">
        <button matButton routerLink="/wishlist">Vidi sve</button>
        <button matButton="filled" class="flex items-center gap-2" (click)="store.addAllWishlistToCart()">
            <mat-icon>shopping_cart</mat-icon>
            Dodaj sve u korpu
        </button>
    </div>
</div>
  `,
  styles: ``,
})
export class TeaseWishlist {
  store = inject(ToyStore)
}
