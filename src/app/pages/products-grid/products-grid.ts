import { Component, inject, input } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { ProductCard } from "../../components/product-card/product-card";
import { ToyStore } from '../../store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButton
  ],
  template: `
  <mat-sidenav-container class="min-h-screen">
    
    <mat-sidenav 
      class="w-72 border-none shadow-[4px_0_24px_rgba(0,0,0,0.02)]" 
      mode="side" 
      [opened]="store.sidebarOpen()"
    >
      <div class="p-6 flex flex-col h-full bg-white">
        <div class="flex items-center gap-3 mb-8 px-2">
          <div class="w-1.5 h-8 bg-blue-600 rounded-full"></div>
          <h2 class="text-xl font-bold text-gray-800 tracking-tight m-0 uppercase text-xs tracking-[0.1em]">Kategorije</h2>
        </div>

        <mat-nav-list class="space-y-1">
          @for (categ of store.categories(); track categ) {
            <a 
              mat-list-item 
              [routerLink]="['/products', categ]"
              class="category-item"
              [class.is-active]="categ === category()"
            >
              <div class="flex items-center">
                <mat-icon class="icon-size">
                  {{ getCategoryIcon(categ) }}
                </mat-icon>
                @if(categ == 'svi'){
                  <span class="font-medium text-[0.9rem] ml-3">Svi proizvodi</span>
                }@else {
                  <span class="font-medium text-[0.9rem] ml-3">{{ categ | titlecase }}</span>
                }
              </div>
            </a>
          }
        </mat-nav-list>

        <div class="mt-auto p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <p class="text-[10px] text-blue-700 font-black mb-1 uppercase tracking-widest">ToyApp Info</p>
          <p class="text-sm text-blue-900/60 mb-4 leading-relaxed">Sve igračke su proverene i sertifikovane.</p>
          <button class="w-full py-2 bg-white text-blue-600 text-[11px] font-bold rounded-lg shadow-sm border border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer">
            SIGURNOST
          </button>
        </div>
      </div>
    </mat-sidenav>

    <mat-sidenav-content class="bg-[#f8fafc] p-8">
      <div class="max-w-7xl mx-auto">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <nav class="flex text-[10px] text-blue-600 uppercase tracking-[0.2em] mb-2 font-bold italic opacity-70">
              Katalog Proizvoda
            </nav>
            @if(category() == 'svi'){
              <h1 class="text-4xl font-black text-gray-900 tracking-tight">Svi proizvodi</h1>
            }@else {
              <h1 class="text-4xl font-black text-gray-900 tracking-tight">{{category() | titlecase}}</h1>
            }
          </div>
          
          <div class="flex items-center bg-white px-5 py-2 rounded-xl shadow-sm border border-gray-100">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-tighter">
              Rezultata: <strong class="text-blue-600 ml-1">{{store.filteredProducts().length}}</strong>
            </span>
          </div>
        </div>

        @if (store.filteredProducts().length > 0) {
          <div class="responsive-grid !gap-8">
            @for (product of store.filteredProducts(); track product.toyId) {
              <div class="relative group">
                <app-product-card [product]="product" class="transition-all duration-300 group-hover:-translate-y-2 block" />
                <app-toggle-wishlist-button 
                  class="!absolute z-10 top-3 right-3" 
                  [product]="product" 
                  [style.view-transition-name]="'wishlist-button-' + product.toyId"
                />
              </div>
            }
          </div>
        } @else {
          <div class="flex flex-col items-center justify-center py-32 text-center">
            <mat-icon class="text-gray-200 !w-20 !h-20 text-[80px] mb-4">inventory_2</mat-icon>
            <h2 class="text-xl font-bold text-gray-800">Trenutno nema proizvoda</h2>
            <p class="text-gray-400 max-w-xs mb-6 text-sm">Pokušaj sa drugom kategorijom ili očisti pretragu.</p>
            <button (click)="store.clearSearch()" class="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-all cursor-pointer border-none">
              Resetuj filter
            </button>
          </div>
        }
      </div>
    </mat-sidenav-content>

  </mat-sidenav-container>
  `,
  styles: [`
    :host ::ng-deep .mat-drawer-content,
    :host ::ng-deep .mat-drawer-inner-container {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }

    :host ::ng-deep .mat-drawer-content::-webkit-scrollbar,
    :host ::ng-deep .mat-drawer-inner-container::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }

    ::ng-deep .mat-drawer {
      border: none !important;
    }

    ::ng-deep .category-item.mat-mdc-list-item {
      margin: 2px 12px !important;
      border-radius: 10px !important;
      transition: all 0.2s ease !important;
      height: 48px !important;
    }

    ::ng-deep .category-item.mat-mdc-list-item:hover {
      background-color: #f1f5f9 !important;
    }

    /* Aktivno stanje */
    ::ng-deep .category-item.is-active {
      background-color: #eff6ff !important;
      color: #2563eb !important;
    }

    .icon-size {
      font-size: 20px !important;
      width: 20px !important;
      height: 20px !important;
      color: #94a3b8;
    }

    .is-active .icon-size {
      color: #2563eb !important;
    }

    /* Uklanjanje ripple overlay-a i linija iz globalnog stila */
    ::ng-deep .mat-mdc-list-item-interactive::before {
      display: none !important;
    }
  `]
})
export default class ProductsGrid {
  store = inject(ToyStore);
  category = input<string>('svi')

  constructor() {
    this.store.loadProducts()
    this.store.setCategory(this.category)
  }

  getCategoryIcon(cat: string): string {
    const c = cat.toLowerCase()
    if (c.includes('svi')) return 'grid_view'
    if (c.includes('slagalica')) return 'extension'
    if (c.includes('slikovnica')) return 'auto_stories'
    if (c.includes('figura')) return 'emoji_objects'
    if (c.includes('kreativni')) return 'palette'
    if (c.includes('vozilo')) return 'directions_car'
    if (c.includes('plišana')) return 'toys'
    if (c.includes('društvena')) return 'casino'
    if (c.includes('konstruktorski')) return 'handyman'
    if (c.includes('muzička')) return 'music_note'
    if (c.includes('edukativna')) return 'psychology'
    return 'smart_toy'
  }
}