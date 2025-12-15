import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { OrderCreateRequest, OrderResponseModel } from '../models/order-model'

@Injectable({ providedIn: 'root' })
export class OrderService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:8000/order'

    createOrder(data: OrderCreateRequest): Observable<OrderResponseModel> {
        return this.http.post<OrderResponseModel>(`${this.apiUrl}/create`, data)
    }

    getMyOrders(): Observable<OrderResponseModel[]> {
        return this.http.get<OrderResponseModel[]>(`${this.apiUrl}/my_orders`)
    }

    cancelOrder(orderId: string) {
        return this.http.patch(`${this.apiUrl}/${orderId}`, { "cancel": true })
    }
}