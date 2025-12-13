import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { ToyStore } from '../../store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  template: `
    <div appViewPanel>
    <h2 class="text-2xl font-bold mb-4">Narudžbina</h2>
    <div class="space-y-2 border-b pb-4">
        <ng-content select="[checkoutItems]"></ng-content>
    </div>
    <div class="space-y-3 text-lg pt-4">
        <div class="flex justify-between">
            <span>Cena bez PDV</span>
            <span>RSD {{ base().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
            <span>PDV (18%)</span>
            <span>RSD {{ tax().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between border-t pt-3 font-bold text-lg">
            <span>Ukupno</span>
            <span>RSD {{ total().toFixed(2) }}</span>
        </div>
    </div>
    <ng-content select="[actionButtons]"></ng-content>
</div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store = inject(ToyStore)

  total = computed(() =>
    this.store.cartItems().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
  );
  tax = computed(() => {
    const rate = 0.18
    return this.total() * rate / (1 + rate)
  })

  base = computed(() => this.total() - this.tax())
}
