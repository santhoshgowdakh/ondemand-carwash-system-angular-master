import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from '../car/car';
import { CarService } from '../car/car.service';
import { Plan } from '../plan/plan';
import { PlanService } from '../plan/plan.service';
import { Promocode } from '../promocode/promocode';
import { PromocodeService } from '../promocode/promocode.service';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { Order } from './order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  // placeOrderForm!:FormGroup;
  order!:Order;
  authenticationResponse!:AuthenticationResponse;
  selectedPlan!: Plan;
  cars!:Car[];
  carCount!:number;
  appliedPromocode!:Promocode;
  ngOnInit(): void {
    // this.placeOrderForm= new FormGroup({
      //   carId: new FormControl('30001' ,Validators.required),
      //   orderId: new FormControl('1111', Validators.required),
    //   customerId: new FormControl('',Validators.required),
    //   washerId: new FormControl('',Validators.required),
    //   planId: new FormControl('',Validators.required),
    //   promocodeId: new FormControl('',Validators.required),
    //   totalPrice: new FormControl('',Validators.required),
    //   beforeWashPic: new FormControl('',Validators.required),
    //   afterWashPic: new FormControl('',Validators.required),
    //   orderStatus: new FormControl('',Validators.required),
    //   placedOn: new FormControl('',Validators.required),
    //   scheduledOn: new FormControl('',Validators.required),
    //   closedOn: new FormControl('',Validators.required),
    // });
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null||this.authenticationResponse.userRole!='customer'){
      this.router.navigate(['plan-list']);
    }
    this.order=new Order();
    // this.order.orderId=1111;
    this.order.promocode="";
    this.order.customerId=this.authenticationResponse.userId;
    this.carType='seden';
    this.getCarsByCustomerId();
    this.getPromocodes();
    this.getPlans();
  }
  constructor(private router:Router,private planService:PlanService, private orderService:OrderService,private promocodeService:PromocodeService,private carService:CarService) { }
  
  getCarsByCustomerId(){
    this.carService.getCarsByCustomerId(this.authenticationResponse.userId)
    .subscribe(data=> {this.cars=data;
      console.log(this.cars);
      // this.carCount=this.cars.length;
      // console.log(this.carCount);
    });
  }
  
  plans!: Plan[];
  promocodes!:Promocode[];
  promocode!:Promocode;
  basicPlan!:Plan;
  standardPlan!:Plan;
  premiumPlan!:Plan;
  carType:string="seden";

  show=false;
  setPlan(plan:Plan){
    if(this.order.carId==null){
      alert("choose car first")
    }
    else{

      this.show=true;
      this.order.planId=plan.planId;
      this.order.totalPrice=plan.price;
      this.selectedPlan=plan;
      console.log(this.order.totalPrice);
    }
    
  }
  discount:number=0;
  promocodeApply!:string;
  applyPromocode(promocode:string){
    this.promocodeService.getPromocodeByPromocode( promocode)
    .subscribe(data=> {this.promocode=data;
    this.order.promocode=this.promocode.promocode;
    console.log(this.promocode);
    this.discount=this.selectedPlan.price*((this.promocode.discount)/100);
    this.order.totalPrice=this.selectedPlan.price-this.discount;
  });

  }

  getPlans(){
    this.planService.viewAllPlansByCarType(this.carType).subscribe(
      data=>{  const plans=data;
        this.plans=plans;
        this.basicPlan=plans[0];
        this.standardPlan=plans[1];
        this.premiumPlan=plans[2];
       });
    }
    getPromocodes(){
      this.promocodeService.viewAllPromocodes().subscribe(data=>this.promocodes=data);
    }
  setCarType(value:string){
    console.log(value);
    this.carType=value;
    this.getPlans();
    this.show=false
  }
  placeOrder(){
    this.order.placedOn=new Date();
    console.log(this.order);
    this.orderService.placeOrder(this.order).subscribe
    (data => {
    console.log(data);
    });
    console.log("placed");
  }

redirect(){

}

selectCar(car:Car){
  this.order.carId=car.carId;
  this.setCarType(car.carType);
  console.log(car.carId, car.carType);
}

}
