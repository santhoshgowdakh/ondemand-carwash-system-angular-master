import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/address/address.service';
import { AuthenticationResponse } from 'src/app/user/AuthenticationResponse';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  
  constructor(private router:Router,private planService:PlanService,public dialog: MatDialog) { }
  authenticationResponse!:AuthenticationResponse;
  addPlanForm!:FormGroup;
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['plan']);
    }
    this.addPlanForm= new FormGroup({
      planName: new FormControl('' ,Validators.required),
      planId: new FormControl('', Validators.required),
      planDescription: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      carType: new FormControl('',Validators.required)
    });

    
  }

  addPlan(){
    console.log(this.addPlanForm.value);
    this.planService.addPlan(this.addPlanForm.value).subscribe
    (data=>{console.log(data);
      this.dialog.closeAll();
      window.location.reload();
    });
  }

  get planId(){
    return this.addPlanForm.get('planId');
   }
  get planName(){
    return this.addPlanForm.get('planName');
   }
   get planDescription(){
    return this.addPlanForm.get('planDescription');
   }
   get price(){
    return this.addPlanForm.get('price');
   }
   get carType(){
    return this.addPlanForm.get('carType');
   }
   

}
