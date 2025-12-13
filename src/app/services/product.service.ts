import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ProductModel } from "../models/product-model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient)

    private apiUrl = 'http://localhost:8000/enriched'

    getEnrichedProducts(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.apiUrl).pipe(
            map(products =>
                products.map(p => ({
                    ...p,
                    imageUrl: `https://toy.pequla.com${p.imageUrl}`,
                    inStock: p.quantity > 0
                }))
            )
        )
    }
}