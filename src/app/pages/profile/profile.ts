import { Component, inject } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'

import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'

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
    MatIcon,
    MatDividerModule,
    BackButton,
    WriteReview,
    ViewPanel
  ],
  template: `
    <div class="bg-[#f8fafc] min-h-screen pb-20">
      <div class="mx-auto max-w-[1100px] pt-8 px-4">
        
        <app-back-button class="mb-8 block" [navigateTo]="navigator.get()" label="Povratak u prodavnicu"/>

        <div class="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center gap-8">
          <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-100">
             {{ getInitials(auth.user()?.name) }}
          </div>
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-black text-gray-900 mb-1 tracking-tight">{{ auth.user()?.name }}</h1>
            <p class="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
              <mat-icon class="!w-5 !h-5 !text-[20px]">mail</mat-icon> {{ auth.user()?.email }}
            </p>
          </div>
          <div class="flex flex-col items-center bg-blue-50 px-8 py-4 rounded-3xl border border-blue-100">
            <span class="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">Ukupno narudžbina</span>
            <span class="text-3xl font-black text-blue-900">{{ store.enrichedOrders().length }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between mb-8 px-2">
          <h2 class="text-2xl font-black text-gray-800 tracking-tight">Istorija narudžbina</h2>
          <div class="h-[1px] flex-1 bg-gray-200 mx-8 hidden md:block"></div>
        </div>

        <mat-accordion class="modern-accordion" multi="false">
          @for (order of store.enrichedOrders(); track order.id) {
            <mat-expansion-panel class="!rounded-[24px] !mb-6 !border-none !shadow-sm overflow-hidden border border-gray-50">
              <mat-expansion-panel-header class="!h-auto !py-8">
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-4 gap-x-6 w-full pr-4 items-center">
                  
                  <div class="flex flex-col">
                    <span class="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Datum</span>
                    <span class="text-sm font-bold text-gray-800">{{ order.createdAt | date:'dd.MM.yyyy' }}</span>
                    <span class="text-[10px] text-gray-400 font-medium italic">#{{ order.id.substring(0,8) }}</span>
                  </div>

                  <div class="flex flex-col hidden md:flex">
                    <span class="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Grad</span>
                    <span class="text-sm font-bold text-gray-700 truncate">📍 {{ order.city }}</span>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                      @if (order.paymentType === 'visa') { <img src="visa.png" class="h-3" /> }
                      @else if (order.paymentType === 'mastercard') { <img src="mastercard.svg" class="h-3" /> }
                      @else { <mat-icon class="!w-5 !h-5 !text-[20px] text-gray-400">payments</mat-icon> }
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[10px] font-black uppercase tracking-widest" 
                            [ngClass]="{
                                'text-green-600': order.paymentStatus === 'success',
                                'text-amber-600': order.paymentStatus === 'pending',
                                'text-red-600': order.paymentStatus === 'canceled'
                            }">
                            {{ getStatusLabel(order.paymentStatus) }}
                        </span>
                    </div>
                  </div>

                  <div>
                    <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
                      [ngClass]="{
                        'bg-green-50 text-green-700 border-green-100': order.deliveryStatus === 'success',
                        'bg-amber-50 text-amber-700 border-amber-100': order.deliveryStatus === 'pending',
                        'bg-red-50 text-red-700 border-red-100': order.deliveryStatus === 'canceled'
                      }">
                      {{ deliveryLabel(order.deliveryStatus) }}
                    </span>
                  </div>

                  <div class="flex flex-col text-right">
                    <span class="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Iznos</span>
                    <span class="text-base font-black text-gray-900">RSD {{ order.total }}</span>
                  </div>

                  <div class="flex justify-end pl-4">
                    <button
                      mat-button
                      class="!text-[10px] !font-black !tracking-widest !uppercase !px-4 !h-9 !rounded-xl !border-2"
                      [color]="'warn'"
                      [disabled]="order.paymentStatus === 'success' || order.paymentStatus === 'canceled' || order.deliveryStatus === 'success' || order.deliveryStatus === 'canceled'"
                      (click)="store.cancelOrder(order.id); $event.stopPropagation()">
                      Otkaži
                    </button>
                  </div>

                </div>
              </mat-expansion-panel-header>

              <div class="bg-gray-50/70 p-8 border-t border-gray-100">
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div class="space-y-4">
                    <h4 class="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                      <mat-icon class="!w-4 !h-4 !text-[16px]">local_shipping</mat-icon> Adresa isporuke
                    </h4>
                    <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <p class="text-sm font-bold text-gray-800 mb-1">{{ order.address }}</p>
                      <p class="text-sm text-gray-500 font-medium">{{ order.city }}, {{ order.zip }}</p>
                      <div class="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400 font-bold">
                        <mat-icon class="!w-4 !h-4 !text-[14px]">phone</mat-icon> {{ order.phone }}
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <h4 class="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                      <mat-icon class="!w-4 !h-4 !text-[16px]">credit_card</mat-icon> Informacije o plaćanju
                    </h4>
                    <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <div class="flex items-center justify-between mb-4">
                        <span class="text-xs font-bold text-gray-400 uppercase">Metod:</span>
                        <span class="text-sm font-black text-gray-800 capitalize">{{ order.paymentType }}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-gray-400 uppercase">Status transakcije:</span>
                        <span class="text-xs font-black uppercase" 
                             [ngClass]="{
                               'text-green-600': order.paymentStatus === 'success',
                               'text-amber-600': order.paymentStatus === 'pending',
                               'text-red-600': order.paymentStatus === 'canceled'
                             }">
                          {{ getStatusLabel(order.paymentStatus) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <h4 class="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                      <mat-icon class="!w-4 !h-4 !text-[16px]">receipt_long</mat-icon> Rekapitulacija
                    </h4>
                    <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                      <div class="flex justify-between text-xs font-medium text-gray-500">
                        <span>Osnovica:</span>
                        <span>RSD {{ (order.total * 0.82).toFixed(2) }}</span>
                      </div>
                      <div class="flex justify-between text-xs font-medium text-gray-500">
                        <span>PDV (18%):</span>
                        <span>RSD {{ (order.total * 0.18).toFixed(2) }}</span>
                      </div>
                      <div class="flex justify-between text-xs font-bold text-green-600 pb-3 border-b border-dashed border-gray-100">
                        <span>Dostava:</span>
                        <span class="uppercase tracking-tighter italic">Besplatna</span>
                      </div>
                      <div class="flex justify-between text-base font-black text-gray-900">
                        <span>Ukupno:</span>
                        <span>RSD {{ order.total }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Sadržaj paketa</div>
                <div class="space-y-4">
                  @for (item of order.items; track item.product.toyId) {
                    <div class="bg-white border border-gray-100 rounded-[20px] p-5 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-all group" appViewPanel>
                      <img [src]="item.product.imageUrl" class="w-20 h-20 rounded-xl object-cover border border-gray-50 group-hover:scale-105 transition-transform"/>
                      <div class="flex-1 text-center sm:text-left">
                        <h4 class="font-bold text-gray-900 text-base leading-tight mb-2">{{ item.product.name }}</h4>
                        <div class="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
                           <span class="text-xs text-gray-400 font-bold uppercase tracking-tighter">Količina: <b class="text-gray-900 ml-1">x{{ item.quantity }}</b></span>
                           <span class="text-xs text-gray-400 font-bold uppercase tracking-tighter">Cena: <b class="text-gray-900 ml-1">RSD {{ item.product.price }}</b></span>
                        </div>
                      </div>
                      
                      <button mat-flat-button color="primary"
                        class="!rounded-xl !text-[11px] !font-black !px-6 !h-10 !shadow-lg !shadow-blue-100"
                        [disabled]="order.paymentStatus !== 'success' || order.deliveryStatus !== 'success'"
                        (click)="store.startReview(item.product.toyId); $event.stopPropagation()">
                        OCENI IGRAČKU
                      </button>
                    </div>
                    
                    @if (store.reviewingProductId() === item.product.toyId) {
                      <div class="mt-4 p-6 bg-white rounded-2xl border-2 border-blue-50 shadow-inner" (click)="$event.stopPropagation()">
                        <app-write-review [toyId]="item.product.toyId" />
                      </div>
                    }
                  }
                </div>
              </div>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </div>
    </div>
  `,
  styles: [`
    ::ng-deep .modern-accordion .mat-expansion-panel {
      box-shadow: 0 4px 20px -5px rgba(0,0,0,0.03) !important;
    }
    ::ng-deep .modern-accordion .mat-expansion-panel-header:hover {
      background: #ffffff !important;
    }
    ::ng-deep .mat-expansion-panel-body {
      padding: 0 !important;
    }
    ::ng-deep .mat-expansion-indicator::after {
      color: #cbd5e1 !important;
      padding: 3px;
    }
  `]
})
export default class Profile {
  auth = inject(AuthStore)
  store = inject(ToyStore)
  navigator = inject(NavigatorService)

  constructor() {
    this.store.loadProducts()
    this.store.loadMyOrders()
  }

  getInitials(name: string | undefined): string {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  getStatusLabel(status: string) {
    switch (status) {
      case 'success': return 'Uspešno'
      case 'pending': return 'Na čekanju'
      case 'canceled': return 'Otkazano'
      default: return status
    }
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