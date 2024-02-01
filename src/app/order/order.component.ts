import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcceptOrderRequest } from '../models/AcceptOrderRequest';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { Order } from './order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders!:Order[];
  authenticationResponse!: AuthenticationResponse;
  constructor(private orderService:OrderService,private router:Router) { }

  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['plan']);
    }
    this.getUserOrders();
  }
  show=false;
getAllOpenOrders(){
this.orderService.getOrdersByOrderStatus("open").subscribe
(data=>{this.orders=data;
  this.show=false;});
}
getAllOrders(){
  this.orderService.viewAllOrders().subscribe
  (data=>{this.orders=data;
    this.show=false;});
  }
getUserOrders(){
this.orderService.getOrdersByUserId(this.authenticationResponse.userRole+"/"+this.authenticationResponse.userId).subscribe
(data=>{this.orders=data;
this.show=true;});
}
getAcceptedOrders(){
  if(this.authenticationResponse.userRole=='customer'){
  
    this.orders=this.orders.filter(o=>o.orderStatus=='open'||o.orderStatus=='scheduled');
  }else{
    this.orders=this.orders.filter(o=>o.orderStatus=='scheduled');

  }
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
completeOrder(order:Order){
  if(order.orderStatus!='scheduled'){
    alert("try again")
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

  deleteOrder(order:Order){
    var answer = window.confirm("Delete order? Order ID="+order.orderId);
    if(answer){

      this.orderService.deleteOrderByOrderId(order.orderId).subscribe
      (data=>{console.log(data);
      });
      window.location.reload();
    }
    else{
      alert("delete failed!");
    }
  }

}
