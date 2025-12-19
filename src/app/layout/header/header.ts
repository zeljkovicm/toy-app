import { Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderActions } from "../header-actions/header-actions";
import { ToyStore } from '../../store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, HeaderActions],
  template: `
    <mat-toolbar class="header-toolbar elevated">
      <div class="container-fluid">
        
        <button mat-icon-button (click)="store.toggleSidebar()" class="menu-btn">
          <mat-icon>menu</mat-icon>
        </button>

        <div class="search-container">
          <div class="search-wrapper group" [class.is-focused]="isFocused()">
            
            <div class="search-icon">
              <mat-icon [class.text-blue-500]="isFocused()">search</mat-icon>
            </div>

            <input
              type="text"
              placeholder="Pretraži igračke..."
              class="search-input"
              [value]="store.searchTerm()"
              (input)="store.setSearchTerm($any($event.target).value)"
              (focus)="isFocused.set(true)"
              (blur)="isFocused.set(false)"
            />

            @if (store.searchTerm()) {
              <button (click)="store.clearSearch()" class="clear-btn">
                <mat-icon>cancel</mat-icon>
              </button>
            }
          </div>
        </div>

        <app-header-actions />
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      background: white !important;
      border-bottom: 1px solid #f1f5f9;
      padding: 0 !important;
      display: flex;
      align-items: center;
    }

    .container-fluid {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 16px;
      height: 64px;
    }

    .search-container {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 400px;
    }

    .search-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: #f1f5f9;
      border-radius: 12px;
      padding: 0 12px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      height: 40px;
    }

    .search-wrapper.is-focused {
      background: white;
      border-color: #3b82f6;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
      max-width: 440px;
    }

    .search-input {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      padding-left: 32px;
      font-size: 0.9rem;
      color: #1e293b;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      display: flex;
      align-items: center;
      color: #94a3b8;
    }
    
    .search-icon mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .clear-btn {
      background: none;
      border: none;
      color: #cbd5e1;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0;
    }

    .clear-btn mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .menu-btn {
      color: #64748b !important;
    }
  `]
})
export class Header {
  store = inject(ToyStore)
  isFocused = signal(false)
}