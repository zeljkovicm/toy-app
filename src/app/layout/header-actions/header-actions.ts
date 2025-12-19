import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { Router, RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge'
import { ToyStore } from '../../store';
import { AuthStore } from '../../auth-store';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { MatDividerModule } from "@angular/material/divider";
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu'
import { MatDialog } from '@angular/material/dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { NavigatorService } from '../../services/navigate.service';

@Component({
  selector: 'app-header-actions',
  standalone: true,
  imports: [
    MatButton, MatIconButton, MatIcon, RouterLink, MatBadge,
    MatMenu, MatMenuTrigger, MatMenuItem, MatDividerModule
  ],
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
        <button matIconButton [matMenuTriggerFor]="userMenu" class="!w-10 !h-10 !p-0 overflow-hidden border-2 border-transparent hover:border-blue-100 transition-all">
            <div class="w-full h-full flex items-center justify-center">
                @if(auth.user()?.image) {
                  <img [src]="auth.user()?.image" [alt]="auth.user()?.name" class="w-8 h-8 rounded-full object-cover" />
                } @else {
                  <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-blue-900 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {{ getInitials(auth.user()?.name) }}
                  </div>
                }
            </div>
        </button>

        <mat-menu #userMenu="matMenu" xPosition="before" class="modern-menu">
          <div class="px-4 py-3 mb-1 bg-gray-50/50">
            <p class="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Prijavljeni ste kao</p>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-gray-900 leading-tight">{{auth.user()?.name}}</span>
              <span class="text-xs text-gray-500 truncate">{{auth.user()?.email}}</span>
            </div>
          </div>
          
          <mat-divider></mat-divider>

          <div class="py-1">
            <button mat-menu-item (click)="goToProfile()" class="!h-10">
              <mat-icon class="!mr-2 text-gray-400">person_outline</mat-icon>
              <span class="text-sm">Moj Profil</span>
            </button>
            
            <button mat-menu-item class="!h-10">
              <mat-icon class="!mr-2 text-gray-400">help</mat-icon>
              <span class="text-sm">Pomoć</span>
            </button>
          </div>

          <mat-divider></mat-divider>

          <div class="py-1">
            <button mat-menu-item (click)="auth.signOut()" class="!h-10 group">
              <mat-icon class="!mr-2 text-red-400 group-hover:text-red-600">logout</mat-icon>
              <span class="text-sm text-red-600 font-medium">Izloguj se</span>
            </button>
          </div>
        </mat-menu>

      } @else {
        <button matButton (click)="openSignInDialog()" class="!text-gray-700">Prijava</button>
        <button matButton="filled" (click)="openSignUpDialog()" class="!rounded-full">Registracija</button>
      }
    </div>
  `,
  styles: [`
    ::ng-deep .modern-menu.mat-mdc-menu-panel {
      border-radius: 16px !important;
      margin-top: 8px !important;
      min-width: 220px !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
      border: 1px solid #f1f5f9 !important;
      overflow: hidden !important;
    }

    ::ng-deep .modern-menu .mat-mdc-menu-content {
      padding: 0 !important;
    }

    ::ng-deep .modern-menu .mat-mdc-menu-item {
      transition: all 0.2s ease !important;
    }

    ::ng-deep .modern-menu .mat-mdc-menu-item:hover {
      background-color: #f8fafc !important;
    }
  `],
})
export class HeaderActions {
  store = inject(ToyStore)
  auth = inject(AuthStore)
  matDialog = inject(MatDialog)
  navigator = inject(NavigatorService)
  router = inject(Router)

  goToProfile() {
    this.navigator.save(this.router.url)
    this.router.navigateByUrl('/profile')
  }

  getInitials(name: string | undefined): string {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      id: 'sign-in-dialog',
      disableClose: true,
      data: { checkout: false }
    })
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, { disableClose: true })
  }
}