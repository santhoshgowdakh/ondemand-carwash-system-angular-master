import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { Plan } from './plan';
import { PlanService } from './plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(private planService:PlanService,public router:Router,public dialog: MatDialog) { }

  plans!:Plan[];
  authenticationResponse!:AuthenticationResponse;
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null||this.authenticationResponse.userRole!='admin'){
      this.router.navigate(['plan-list']);
    }
    this.getAllPlans();
  }

  getAllPlans(){
    this.planService.viewAllPlans().subscribe
    (data=>{this.plans=data;
    });
  }

  addPlan() {
    const dialogRef = this.dialog.open(AddPlanComponent, {
      width: '40%',
      height: '70%'
    });
  }
  editPlan(plan:Plan){
    const dialogRef = this.dialog.open(EditPlanComponent, {
      width: '40%',
      height: '70%',
      data: {
        planId:plan.planId,
      }
    });
  }
  deletePlan(plan:Plan){
    var answer = window.confirm("Delete plan? "+plan.planName);
    if(answer){

      this.planService.deleteOrderByPlanId(plan.planId).subscribe
      (data=>{console.log(data);
      });
      window.location.reload();
    }
    else{
      alert("delete failed!");
    }
  }

}
