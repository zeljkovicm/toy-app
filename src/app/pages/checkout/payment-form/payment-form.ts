import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ViewPanel } from '../../../directives/view-panel';
import { MatRadioModule, MatRadioGroup, MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-payment-form',
  imports: [ViewPanel, MatIcon, MatRadioGroup, MatRadioButton],
  template: `
    <div appViewPanel>
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>payment</mat-icon>
        Opcije za plaćanje
    </h2>
    <div>
        <mat-radio-group [value]="'visa'">
            <mat-radio-button value="visa">
                <img src="visa.png" alt="Visa" class="h-6">
            </mat-radio-button>

            <mat-radio-button value="mastercard">
                <img src="mastercard.svg" alt="Mastercard" class="h-6">
            </mat-radio-button>

            <mat-radio-button value="cash">
                <img src="cash.svg" alt="Plaćanje pouzećem" class="h-6">
            </mat-radio-button>
        </mat-radio-group>
    </div>
</div>
  `,
  styles: ``,
})
export class PaymentForm {

}
