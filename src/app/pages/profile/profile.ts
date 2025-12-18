import { Component, inject } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'

import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion'
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card'

import { AuthStore } from '../../auth-store'
import { ToyStore } from '../../store'
import { NavigatorService } from '../../services/navigate.service'
import { BackButton } from '../../components/back-button/back-button'
import { WriteReview } from '../../pages/view-product-detail/write-review/write-review'
import { ViewPanel } from "../../directives/view-panel";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    BackButton,
    WriteReview,
    ViewPanel
  ],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button class="mb-6" [navigateTo]="navigator.get()" label="Nazad"/>
      <mat-card class="mb-10">
        <mat-card-header>
          <mat-card-title>{{ auth.user()?.name }}</mat-card-title>
          <mat-card-subtitle>{{ auth.user()?.email }}</mat-card-subtitle>
        </mat-card-header>
      </mat-card>
      <h2 class="text-2xl font-bold mb-4">Moje narudžbine</h2>
      <mat-accordion class="space-y-4" multi="false">
        @for (order of store.enrichedOrders(); track order.id) {
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <div class="flex items-center gap-6 w-full pr-4 text-sm">
                <div class="w-[180px] flex flex-col shrink-0">
                  <div class="font-semibold">
                    {{ order.createdAt | date:'dd.MM.yyyy HH:mm' }}
                  </div>
                  <div class="text-xs text-gray-500">
                    #{{ order.id }}
                  </div>
                </div>
                <div class="flex items-center gap-1 whitespace-nowrap">
                  📞 <span class="font-medium">{{ order.phone }}</span>
                </div>
                <div class="flex flex-col whitespace-nowrap leading-tight">
                  <span class="font-medium">
                    📍 {{ order.city }}
                  </span>
                  <span class="text-xs text-gray-500">
                    📍{{ order.address }}
                  </span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap">
                  @if (order.paymentType === 'visa') {
                    <img src="visa.png" class="h-4" />
                  } @else if (order.paymentType === 'mastercard') {
                    <img src="mastercard.svg" class="h-4" />
                  } @else {
                    <img src="cash.svg" class="h-4" />
                  }
                  <span class="capitalize font-medium">
                    {{ order.paymentType }}
                  </span>
                </div>
                <span class="px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap" 
                [ngClass]="{'bg-green-100 text-green-700': order.paymentStatus === 'success',
                            'bg-yellow-100 text-yellow-700': order.paymentStatus === 'pending',
                            'bg-red-100 text-red-700': order.paymentStatus === 'canceled'}"
                >
                  {{ order.paymentStatus === 'success' ? 'Plaćeno' : order.paymentStatus === 'pending' ? 'Na čekanju' : 'Otkazano' }}
                </span>
                <span
                  class="px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
                  [ngClass]="{
                    'bg-green-100 text-green-700': order.deliveryStatus === 'success',
                    'bg-yellow-100 text-yellow-700': order.deliveryStatus === 'pending',
                    'bg-red-100 text-red-700': order.deliveryStatus === 'canceled'}">
                  {{ deliveryLabel(order.deliveryStatus) }}
                </span>
                <div class="flex-1"></div>
                <div class="text-right whitespace-nowrap w-[120px]">
                  <div class="text-xs text-gray-500">Ukupno</div>
                  <div class="font-bold">
                    RSD {{ order.total }}
                  </div>
                </div>
                <button
                  matButton="outlined"
                  class="danger whitespace-nowrap"
                  [disabled]="
                    (order.paymentStatus === 'success' && order.deliveryStatus === 'success') ||
                    order.paymentStatus === 'canceled' ||
                    order.deliveryStatus === 'canceled'
                  "
                  (click)="store.cancelOrder(order.id); $event.stopPropagation()">
                  Otkaži
                </button>

              </div>
            </mat-expansion-panel-header>
            <div class="pt-6 space-y-6">
              @for (item of order.items; track item.product.toyId) {
                <div class="border rounded-lg p-4" appViewPanel>
                  <div class="flex items-center gap-4 w-full">
                    <img [src]="item.product.imageUrl" class="w-20 h-20 rounded-lg object-cover"/>
                    <div class="flex-1">
                      <div class="font-semibold text-gray-900">
                        {{ item.product.name }}
                      </div>
                      <div class="text-sm text-gray-600">
                        Količina: x {{ item.quantity }}
                      </div>
                      <div class="text-sm text-gray-600">
                        Cena: RSD {{ item.product.price }}
                      </div>
                    </div>
                    <button matButton="outlined"
                      [disabled]="order.paymentStatus !== 'success' || order.deliveryStatus !== 'success'"
                      (click)="store.startReview(item.product.toyId); $event.stopPropagation()">
                      Oceni
                    </button>
                  </div>
                  @if (store.reviewingProductId() === item.product.toyId) {
                    <div class="mt-4" (click)="$event.stopPropagation()">
                      <app-write-review [toyId]="item.product.toyId" />
                    </div>
                  }
                </div>
              }
            </div>
          </mat-expansion-panel>
        }
      </mat-accordion>
    </div>
  `,
})
export default class Profile {
  auth = inject(AuthStore)
  store = inject(ToyStore)
  navigator = inject(NavigatorService)

  constructor() {
    this.store.loadProducts()
    this.store.loadMyOrders()
  }

  deliveryLabel(status: string) {
    switch (status) {
      case 'success': return 'Dostavljeno'
      case 'pending': return 'U dostavi'
      case 'canceled': return 'Otkazano'
      default: return status
    }
  }
}
