import { Component, input, output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-quantity-selector',
  imports: [MatIcon],
  template: `
    <div class="flex items-center gap-3">
    <div class="inline-flex items-center">
        <button matIconButton [disabled]="quantity() === 1" (click)="quantityUpdated.emit(quantity() -1)">
            <mat-icon>remove</mat-icon>
        </button>
        <div class="px-3">{{ quantity() }}</div>
        <button matIconButton [disabled]="quantity() === 0" (click)="quantityUpdated.emit(quantity()  +1)">
            <mat-icon>add</mat-icon>
        </button>
    </div>
</div>
  `,
  styles: ``,
})
export class QuantitySelector {
  quantity = input(0)
  quantityUpdated = output<number>()
}
