import { Component, computed, effect, inject, input } from '@angular/core';
import { ToyStore } from '../../store';
import { BackButton } from "../../components/back-button/back-button";
import { ProductInfo } from "./product-info/product-info";
import { ViewReview } from "./view-review/view-review";

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, ViewReview],
  template: `
  <div class="mx-auto max-w-[1200px] py-6">
    <app-back-button class="mb-6" [navigateTo]="backRoute()" label="Nastavi kupovinu" />
    @if(store.selectedProduct(); as product){
    <div class="flex gap-8 mb-8">
        <img [src]="product.imageUrl" class="w-[500px] h-[550px] object-cover rounded-lg "
        [style.view-transition-name]="'product-image-' + product.toyId">
        <div class="flex-1">
            <app-product-info class="mb-3 block" [product]="product"></app-product-info>
        </div>
    </div>
    <app-view-review [product]="product"/>
    }
  </div>
  `,
  styles: ``,
})
export default class ViewProductDetail {
  productId = input.required<number>()

  store = inject(ToyStore)

  backRoute = computed(() => `/products/${this.store.category()}`)

  constructor() {
    effect(() => {
      const id = Number(this.productId())


      this.store.setProductId(id)
    }, { allowSignalWrites: true })
  }
}
