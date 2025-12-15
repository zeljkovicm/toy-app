import { Component, computed, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ViewPanel } from '../../../directives/view-panel';
import { MatRadioModule, MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { ToyStore } from '../../../store';

@Component({
    selector: 'app-payment-form',
    imports: [ViewPanel, MatIcon, MatRadioGroup, MatRadioButton],
    template: `
    <div appViewPanel>
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>payment</mat-icon>
        Opcije za plaćanje
        <span class="text-red-500 text-sm">*</span>
    </h2>
    <div>
        <mat-radio-group [value]="null">
            <mat-radio-button value="visa" (change)="onPaymentChange('visa')">
                <img src="visa.png" alt="Visa" class="h-6">
            </mat-radio-button>

            <mat-radio-button value="mastercard" (change)="onPaymentChange('mastercard')">
                <img src="mastercard.svg" alt="Mastercard" class="h-6">
            </mat-radio-button>

            <mat-radio-button value="cash" (change)="onPaymentChange('cash')">
                <img src="cash.svg" alt="Plaćanje pouzećem" class="h-6">
            </mat-radio-button>
        </mat-radio-group>
    </div>
</div>
  `,
    styles: ``,
})
export class PaymentForm {
    store = inject(ToyStore)

    selectedPayment = computed(() =>
        this.store.checkoutForm()?.paymentType ?? 'visa'
    )

    onPaymentChange(value: 'visa' | 'mastercard' | 'cash') {
        this.store.setPaymentType(value)
    }
}
