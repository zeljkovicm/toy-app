import { Component, computed, effect, inject, Injectable, input, signal } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ProductService } from '../../services/product.service';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav'
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list'
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ToyStore } from '../../store';
import { MatIcon } from "@angular/material/icon";
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe, ToggleWishlistButton],
  template: `
  <mat-sidenav-container>
    <mat-sidenav mode="side" opened="true">
      <div class="p-6">
        <h2 class="text-lg text-gray-900">Kategorije</h2>
        <mat-nav-list>
          @for (categ of store.categories(); track categ) {
            <mat-list-item [activated]="categ === category()" class="my-2" [routerLink]="['/products', categ]">
              <span matListItemTitle class="font-medium" [class]="categ === category() ? '!text-white' : null">{{categ | titlecase}}</span>
            </mat-list-item>
          }
        </mat-nav-list>
      </div>
    </mat-sidenav>
    <mat-sidenav-content class="bg-gray-100 p-6 h-full">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">{{category() | titlecase}}</h1>
      <p class="text-base text-gray-600 mb-6">Pronađeno proizvoda: {{store.filteredProducts().length}}</p>
      <div class="responsive-grid">
      @for (product of store.filteredProducts(); track product.toyId) {
        <app-product-card [product]="product">
        <app-toggle-wishlist-button class="!absolute z-10 top-3 right-3" [product]="product" [style.view-transition-name]="'wishlist-button-' + product.toyId"/>
      </app-product-card>
      }
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  store = inject(ToyStore)
  category = input<string>('svi proizvodi') // kategorija iz url

  constructor() {
    this.store.loadProducts();
    this.store.setCategory(this.category)
  }
}
