import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar'
import { HeaderActions } from "../header-actions/header-actions";
import { ToyStore } from '../../store';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, MatIcon],
  template: `
    <mat-toolbar class="w-full elevated py-2 z-10 relative">
      <div class="w-full flex items-center justify-between px-4">
        <button mat-icon-button (click)="store.toggleSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        <app-header-actions />
      </div>
      <div class="absolute left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-4 pointer-events-none">
        <div class="flex justify-center">
          <div class="relative w-full max-w-md pointer-events-auto">
            <input
              type="text"
              placeholder="Pretraži proizvode…"
              class="w-full px-4 py-2 rounded-lg border outline-none focus:ring"
              [value]="store.searchTerm()"
              (input)="store.setSearchTerm($any($event.target).value)"
            />

            @if (store.searchTerm()) {
              <button
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                (click)="store.clearSearch()"
              >
                ✕
              </button>
            }
          </div>
        </div>
      </div>

    </mat-toolbar>
  `,
})
export class Header {
  store = inject(ToyStore)
}