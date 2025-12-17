import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ProductModel } from "../models/product-model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient)

    private apiUrl = 'http://localhost:8000'
    private productsUrl = `${this.apiUrl}/products`

    getEnrichedProducts(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.productsUrl).pipe(
            map(products =>
                products.map(p => ({
                    ...p,
                    imageUrl: `${this.apiUrl}${p.imageUrl}`,
                    inStock: p.quantity > 0
                }))
            )
        )
    }
}