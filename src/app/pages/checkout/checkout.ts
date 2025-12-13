import { Component, inject } from '@angular/core';
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";
import { BackButton } from "../../components/back-button/back-button";
import { PaymentForm } from "./payment-form/payment-form";
import { ShippingForm } from "./shipping-form/shipping-form";
import { ToyStore } from '../../store';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  imports: [SummarizeOrder, BackButton, PaymentForm, ShippingForm, MatButton],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
    <app-back-button class="mb-4" navigateTo="/cart" label="Nazad u korpu" />
    <h1 class="text-3xl font-extrabold mb-4">Narudžba</h1>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3 flex flex-col gap-6">
            <app-shipping-form />
            <app-payment-form />
        </div>
        <div class="lg:col-span-2">
            <app-summarize-order>
                <ng-container checkoutItems>
                    @for (item of store.cartItems(); track item.product.toyId) {
                    <div class="text-sm flex justify-between">
                        <span>{{item.product.name}} x {{item.quantity}}</span>
                        <span>RSD{{(item.product.price * item.quantity).toFixed(2)}}</span>
                    </div>
                    }
                </ng-container>
                <ng-container actionButtons>
                    <button matButton="filled" class="w-full mt-6 py-3"
                        [disabled]="store.loading() || store.cartItemsCount() === 0" (click)="store.placeOrder()">
                        {{ store.loading() ? 'Naručujem...' : 'Naruči' }}
                    </button>
                </ng-container>

            </app-summarize-order>
        </div>
    </div>
</div>
  `,
  styles: ``,
})
export default class Checkout {
  store = inject(ToyStore)
}
