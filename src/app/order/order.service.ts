import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcceptOrderRequest } from '../models/AcceptOrderRequest';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderBaseUrl="http://localhost:8084/order/";
  constructor(private http:HttpClient) { }

  placeOrder(order:Order):Observable<any>{
    return this.http.post<any>(this.orderBaseUrl,order);
   }
  acceptOrder(acceptOrderRequest:AcceptOrderRequest):Observable<any>{
    return this.http.post<any>(this.orderBaseUrl+"accept",acceptOrderRequest);
   }
   updatePromocode(order:Order):Observable<any>{
    return this.http.put<any>(this.orderBaseUrl,order);
   }
  viewAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.orderBaseUrl+"list"); 
   }

   getOrderByOrderId(orderId:number):Observable<Order>{
    return this.http.get<Order>(this.orderBaseUrl+"id/"+orderId);
   }

   deleteOrderByOrderId(orderId:number):Observable<string>{
    return this.http.delete<string>(this.orderBaseUrl+orderId);
   }
   getOrdersByUserId(path:string):Observable<Order[]>{
    return this.http.get<Order[]>(this.orderBaseUrl+path); 
   }
   getOrdersByOrderStatus(status:string):Observable<Order[]>{
    return this.http.get<Order[]>(this.orderBaseUrl+"status/"+status); 
   }
}
