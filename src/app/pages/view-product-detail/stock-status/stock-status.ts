import { Component, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  template: `
    @if(inStock()){
<div class="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-3 bg-white w-full">
    <mat-icon class="small">check_circle</mat-icon>
    <span class="text-xs text-gray-800">Na stanju</span>
</div>
} @else {
<div class="flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-3 bg-white w-full danger">
    <mat-icon class="small">warning</mat-icon>
    <span class="text-xs">Nije na stanju. Ako želiš da budeš obavešten kada se ovaj proizvod ponovo pojavi, dodaj ga u
        svoju listu želja.</span>
</div>
}
  `,
  styles: `
  `,
})
export class StockStatus {
  inStock = input.required<boolean>()
}
