import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { Plan } from './plan';
import { PlanService } from './plan.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  constructor(private planService:PlanService,private router:Router,public dialog: MatDialog) { }
  plans!: Plan[];
  basicPlan!:Plan;
  standardPlan!:Plan;
  premiumPlan!:Plan;
  carType:string="seden";
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse!=null&&this.authenticationResponse.userRole=='customer'){
      this.router.navigate(['place-order']);
    }
   
   this.getPlans();
  }
  setPlan(planId:Number){
    console.log(planId);
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
  setCarType(value:string){
    console.log(value);
    this.carType=value;
    this.getPlans();
  }
  authenticationResponse!:AuthenticationResponse;
 redirect(){
  if(this.authenticationResponse!=null){
    this.router.navigate(['place-order']);
  }
  else{
    this.router.navigate(['home']);
  }
 }

}
