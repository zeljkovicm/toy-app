import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth-store';
import { BackButton } from "../../components/back-button/back-button";
import { NavigatorService } from '../../services/navigate.service';
import { Router } from '@angular/router';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card'
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDivider } from "@angular/material/divider";
import { MatList, MatListItem } from "@angular/material/list";
import { ToyStore } from '../../store';
import { ViewPanel } from "../../directives/view-panel";

@Component({
  selector: 'app-profile',
  imports: [BackButton, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, DatePipe, MatDivider, MatList, MatListItem, CurrencyPipe, ViewPanel],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
  <app-back-button class="mb-6" [navigateTo]="navigator.get()" label="Nazad" />

  <div appViewPanel class="flex gap-8">
    <mat-card class="w-1/3">
      <mat-card-header>
        <div class="w-10 h-10 flex items-center justify-center ml-5">
            @if(false) {
            <img [src]="auth.user()?.image" [alt]="" class="w-8 h-8 rounded-full" />
            } @else {
            <div class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-semibold text-sm">
                {{ auth.getInitials(auth.user()?.name) }}
            </div>
            }
        </div>
        <mat-card-title>{{ auth.user()?.name }}</mat-card-title>
        <mat-card-subtitle>{{ auth.user()?.email }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content class="mt-4">
        <div class="text-sm text-gray-600 mb-2">
          <strong>ID:</strong> {{ auth.user()?.id }}
        </div>

        <div class="text-sm text-gray-600 mb-2">
          <strong>Status:</strong>
          <span class="text-green-600">Aktivan</span>
        </div>

        <div class="text-sm text-gray-600">
          <strong>Član od:</strong>
          {{ auth.user()?.createdAt | date:'MMM yyyy' }}
        </div>
      </mat-card-content>
    </mat-card>

    <div class="flex-1">
      <mat-card>
        <mat-card-title class="px-4 pt-4">
          Moje narudžbine
        </mat-card-title>

        <mat-divider></mat-divider>

        <mat-card-content class="p-4">
          @if(store.products()) {
            <mat-list>
              @for(product of store.products(); track product.toyId) {
                <mat-list-item>
                  <div class="w-full flex justify-between items-center">
                    <div>
                      <div class="font-medium">
                        Narudžbina #{{ product.toyId }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ product.productionDate| date:'MMM d, yyyy' }}
                      </div>
                    </div>

                    <div class="text-right">
                      <div class="font-semibold">
                        {{ product.price | currency:'RSD' }}
                      </div>
                      <div class="text-xs text-green-600">
                        Uspesno
                      </div>
                    </div>
                  </div>
                </mat-list-item>
                <mat-divider></mat-divider>
              }
            </mat-list>
          } @else {
            <div class="text-sm text-gray-500 text-center py-8">
              Trenutno nemaš nijednu narudžbinu.
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  </div>
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
