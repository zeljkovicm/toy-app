import { Component, computed, inject, input } from '@angular/core';
import { CartModel } from '../../models/cart-model';
import { QuantitySelector } from "../../components/quantity-selector/quantity-selector";
import { MatIcon } from "@angular/material/icon";
import { ToyStore } from '../../store';

@Component({
    selector: 'app-show-cart-item',
    imports: [QuantitySelector, MatIcon],
    template: `
    <div class="grid grid-cols-3 grid-cols-[3fr_1fr_1fr]">
    <div class="flex items-center gap-4">
        <img [src]="item().product.imageUrl" class="w-24 h-24 rounded-lg object-cover"
        [style.view-transition-name]="'product-image-' + item().product.toyId">
        <div>
            <div class="text-gray-900 text-lg font-semibold">{{item().product.name}}</div>
            <div class="text-gray-600 text-lg">RSD {{item().product.price}}</div>
        </div>
    </div>

    <app-quantity-selector [quantity]="item().quantity" (quantityUpdated)="store.setItemQuantity({ 
        productId: item().product.toyId, 
        quantity: $event 
    })">
    </app-quantity-selector>

    <div class="flex flex-col items-end">
        <div class="text-right font-semibold text-lg">
            RSD {{total()}}
        </div>
        <div class="flex -me-3">
            <button matIconButton (click)="store.moveToWishlist(item().product)">
                <mat-icon>favorite_border</mat-icon>
            </button>
            <button matIconButton class="danger" (click)="store.removeFromCart(item().product)">
                <mat-icon>delete</mat-icon>
            </button>
        </div>

    </div>
</div>
  `,
    styles: ``,
})
export class ShowCartItem {
    item = input.required<CartModel>()
    store = inject(ToyStore)

    total = computed(() => {
        return this.item().quantity * this.item().product.price
    })
}
