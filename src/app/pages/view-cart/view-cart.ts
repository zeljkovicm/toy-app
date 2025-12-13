import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { TeaseWishlist } from "./tease-wishlist/tease-wishlist";
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";
import { ToyStore } from '../../store';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-view-cart',
    imports: [BackButton, TeaseWishlist, ListCartItems, SummarizeOrder, MatButton],
    template: `
    <div class="mx-auto max-w-[1200px] py-6">
    <app-back-button class="mb-6" navigateTo="/products/svi" label="Nastavi kupovinu" />
    <h1 class="text-3xl font-extrabold mb-4">Korpa</h1>

    <app-tease-wishlist class="mb-6 block"></app-tease-wishlist>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
            <app-list-cart-items></app-list-cart-items>
        </div>
        <div>
            <app-summarize-order>
                <ng-container actionButtons>
                    <button matButton="filled" class="w-full mt-6 py-3" (click)="store.proceedToCheckout()">
                        Nastavi na plaćanje
                    </button>
                </ng-container>
            </app-summarize-order>
        </div>
    </div>
</div>
  `,
    styles: ``,
})
export default class ViewCart {
    store = inject(ToyStore)
}
