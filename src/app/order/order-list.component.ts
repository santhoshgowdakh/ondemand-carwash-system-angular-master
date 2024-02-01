import { Component, OnInit } from '@angular/core';
import { AcceptOrderRequest } from '../models/AcceptOrderRequest';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { Order } from './order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders!:Order[];
  authenticationResponse!: AuthenticationResponse;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    this.getAllOrders();
  }
getAllOrders(){
this.orderService.viewAllOrders().subscribe
(data=>{this.orders=data;})
}

acceptOrder(order:Order){
  if(order.orderStatus!='open'){
    alert("order already accepted")
  }
  else{

    let acceptOrder=new AcceptOrderRequest();
    acceptOrder.orderId=order.orderId;
    acceptOrder.washerId=this.authenticationResponse.userId;
    acceptOrder.scheduledDate=new Date();
    this.orderService.acceptOrder(acceptOrder).subscribe
    (data=>{console.log(data);
    });
    alert("order accepted")
    window.location.reload();
  }
  
  }
  
}

