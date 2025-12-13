import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge'
import { ToyStore } from '../../store';
import { AuthStore } from '../../auth-store';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { MatDivider, MatDividerModule } from "@angular/material/divider";
import { MatMenu, MatMenuTrigger } from '@angular/material/menu'
import { MatDialog } from '@angular/material/dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge, MatDivider, MatMenu, MatMenuTrigger, MatDividerModule],
  template: `
    <div class="flex items-center gap-2">
      <button matIconButton routerLink="/wishlist" [matBadge]="store.wishlistCount()"
          [matBadgeHidden]="store.wishlistCount() === 0">
          <mat-icon>favorite</mat-icon>
      </button>
      <button matIconButton [matBadge]="store.cartCount()" [matBadgeHidden]="store.cartCount() === 0"
        routerLink="/cart">
        <mat-icon>shopping_cart</mat-icon>
      </button>
      @if(auth.isAuthenticated()){
      <button matIconButton [matMenuTriggerFor]="userMenu" class="!p-0">
        <div class="w-10 h-10 flex items-center justify-center">
            @if(false) {
            <img [src]="auth.user()?.image" [alt]="" class="w-8 h-8 rounded-full" />
            } @else {
            <div class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-semibold text-sm">
                {{ getInitials(auth.user()?.name) }}
            </div>
            }
        </div>
      </button>

      <mat-menu #userMenu="matMenu" xPosition="before">
        <div class="flex flex-col px-3 min-w-[200px]  cursor-pointer hover:underline" [routerLink]="['/profile']">
            <span class="text-sm font-medium">{{auth.user()?.name}}</span>
            <span class="text-xs text-gray-500">{{auth.user()?.email}}</span>
        </div>
        <mat-divider></mat-divider>
        <button class="!min-h-[32px] cursor-pointer hover:underline" mat-menu-item (click)="auth.signOut()">
            <mat-icon>logout</mat-icon>Izloguj se
        </button>
      </mat-menu>
      }@else{
      <button matButton (click)="openSignInDialog()">Prijava</button>
      <button matButton="filled" (click)="openSignUpDialog()">Registracija</button>
      }

  </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(ToyStore)
  auth = inject(AuthStore)
  matDialog = inject(MatDialog)

  getInitials(name: string | undefined): string {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      id: 'sign-in-dialog',
      disableClose: true,
      data: {
        checkout: false
      }
    });
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, {
      disableClose: true
    })
  }


}
