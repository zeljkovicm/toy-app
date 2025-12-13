import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [MatIcon, MatButton, RouterLink],
  template: `
    <div class="flex justify-center items-center h-[calc(100vh-64px)] py-6">
    <div class="flex flex-col items-center justify-center text-center bg-white rounded-xl shadow p-8 gap-6">
        <mat-icon class="!text-green-600 !h-[56px] !w-[56px] !text-[56px]">check_circle</mat-icon>
        <h2 class="font-semibold text-green-600 text-2xl font-bold">Naručeno!</h2>
        <p class="text-base">
            Hvala ti na poverenju! Tvoja narudžbina je prihvaćena i biće poslata u što skorijem roku.
        </p>
        <p class="text-gray-600">
            Uskoro ćeš dobiti imejl potvrde sa detaljima svoje narudžbine.
        </p>
        <button matButton="filled" color="primary" class="w-full max-w-xs mt-2" routerLink="/">Nastavi sa
            kupovinom</button>
    </div>
</div>
  `,
  styles: ``,
})
export default class OrderSuccess {

}
