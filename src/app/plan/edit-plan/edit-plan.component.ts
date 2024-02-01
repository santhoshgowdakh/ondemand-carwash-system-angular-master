import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/user/AuthenticationResponse';
import { Plan } from '../plan';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router:Router,private route:ActivatedRoute,private planService:PlanService,public dialog: MatDialog) { }
  authenticationResponse!:AuthenticationResponse;
  editPlanForm!:FormGroup;
  plan!:Plan;
  ngOnInit(): void {
    console.log(this.data);
    const id=this.data.planId;
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['plan']);
    }
    this.editPlanForm= new FormGroup({
      planName: new FormControl('' ,Validators.required),
      planId: new FormControl('', Validators.required),
      planDescription: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      carType: new FormControl('',Validators.required)
    });
    this.getPlanById(id);
  }
  updatePlan(){
    console.log(this.editPlanForm.value);
    this.planService.updatePlan(this.editPlanForm.value).subscribe
    (data=>{console.log(data);
      this.dialog.closeAll();
      window.location.reload();
    });
  }
  getPlanById(id:number):void {
   this.planService.getPlanByPlanId(id).subscribe(
          data=>{this.plan=data;
            this.editPlanForm.patchValue({
              planId:this.plan.planId,
              planName:this.plan.planName,
              planDescription:this.plan.planDescription,
              price:this.plan.price,
              carType:this.plan.carType
            });}
    )
    }
  
    get planId(){
      return this.editPlanForm.get('planId');
     }
    get planName(){
      return this.editPlanForm.get('planName');
     }
     get planDescription(){
      return this.editPlanForm.get('planDescription');
     }
     get price(){
      return this.editPlanForm.get('price');
     }
     get carType(){
      return this.editPlanForm.get('carType');
     }

}
