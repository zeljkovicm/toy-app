import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth-store';
import { BackButton } from "../../components/back-button/back-button";
import { NavigatorService } from '../../services/navigate.service';
import { Router, RouterLink } from '@angular/router';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card'
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { MatDivider } from "@angular/material/divider";
import { MatList, MatListItem } from "@angular/material/list";
import { ToyStore } from '../../store';
import { ViewPanel } from "../../directives/view-panel";
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatIcon } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink, MatButton, BackButton, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, DatePipe, TitleCasePipe, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatIcon],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button class="mb-6" [navigateTo]="navigator.get()" label="Nazad" />

      <mat-card class="mb-10">
        <mat-card-header>
          <mat-card-title>{{ auth.user()?.name }}</mat-card-title>
          <mat-card-subtitle>{{ auth.user()?.email }}</mat-card-subtitle>
        </mat-card-header>
      </mat-card>

      <h2 class="text-2xl font-bold mb-4">Moje narudžbine</h2>

      @if (store.orderList().length === 0) {
        <div class="flex flex-col items-center justify-center py-16 text-center">
          <div class="w-20 h-20 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
            <mat-icon class="text-gray-400 transform scale-150">card_giftcard</mat-icon>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">
            Trenutno nemaš ni jednu narudžbinu
          </h2>
          <p class="text-gray-600 mb-8">
            Pretraži prodavnicu, siguran sam da ćeš naći baš to što ti treba!
          </p>
      
          <button
            matButton="filled"
            routerLink="/products/svi"
            class="min-w-[200px] py-3">
            Pregledaj prodavnicu
          </button>
        </div>
      }

      <mat-accordion class="space-y-4" multi="false">
        @for (order of store.orderList(); track order.id) {
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <div class="grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 items-center w-full pr-4">
                <div>
                  <div class="font-semibold text-lg">
                    {{ order.createdAt | date:'MMM d, yyyy – HH:mm' }}
                  </div>
                  <div class="text-sm text-gray-500">
                    ID: #{{ order.id }}
                  </div>
                </div>
                <div class="flex items-center gap-2 justify-start">
                  @if (order.paymentType === 'visa') {
                    <img src="visa.png" class="h-4" />
                  } @else if (order.paymentType === 'mastercard') {
                    <img src="mastercard.svg" class="h-4" />
                  } @else {
                    <img src="cash.svg" class="h-4" />
                  }
                  <span class="text-sm font-medium">
                    {{ order.paymentType | titlecase }}
                  </span>
                </div>
                <div
                  class="inline-flex justify-center px-2 py-1 rounded-full text-xs font-semibold"
                  [ngClass]="{
                    'bg-green-100 text-green-700': order.paymentStatus === 'success',
                    'bg-yellow-100 text-yellow-700': order.paymentStatus === 'pending',
                    'bg-red-100 text-red-700': order.paymentStatus === 'canceled'
                  }">
                  {{ order.paymentStatus | titlecase }}
                </div>
                <div class="text-right font-bold text-lg">
                  RSD {{ order.total }}
                </div>
              </div>
            </mat-expansion-panel-header>
                
            <div class="pt-6">

              <div class="grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 items-start w-full">
                <div>
                  @for (item of order.items; track item.product.toyId) {
                    <div class="flex items-center gap-4">
                      <img
                        [src]="item.product.imageUrl"
                        class="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <div class="font-semibold text-gray-900">
                          {{ item.product.name }}
                        </div>
                        <div class="text-sm text-gray-600">
                           Količina: x {{ item.quantity }}
                        </div>
                        <div class="text-sm text-gray-600">
                           Jedinična cena: RSD {{ item.product.price }}
                        </div>
                        <div class="text-sm font-medium">
                          Ukupno: RSD {{ item.quantity * item.product.price }}
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <div class="text-sm space-y-2">
                  <div>
                    <div class="text-gray-500">Telefon: <span class="font-medium">{{ order.phone }}</span></div>
                    <div class="text-gray-500">Adresa: <span class="font-medium">{{ order.address }}</span></div>
                    <div class="text-gray-500">Grad: <span class="font-medium">{{ order.city }}</span></div>
                  </div>
                </div>
                <!-- ================= PRAZNO (REZERVA) ================= -->
                <div></div>
                <div class="flex flex-col gap-3 items-end">
                  <button matButton="filled" class="w-1/2" [disabled]="order.paymentStatus !== 'success'"> Oceni
                  </button>
                  <button matButton="outlined" class="danger w-1/2" [disabled]="order.paymentStatus === 'success'">
                    Otkaži
                  </button>
                </div>
              </div>
            </div>

              
          </mat-expansion-panel>
              
        }
      
      </mat-accordion>

    </div>
  `,
  styles: ``,
})
export default class Profile {
  auth = inject(AuthStore)
  navigator = inject(NavigatorService)
  store = inject(ToyStore)
  router = inject(Router)
}
