import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { AddPromocodeComponent } from './add-promocode/add-promocode.component';
import { EditPromocodeComponent } from './edit-promocode/edit-promocode.component';
import { Promocode } from './promocode';
import { PromocodeService } from './promocode.service';

@Component({
  selector: 'app-promocode-list',
  templateUrl: './promocode-list.component.html',
  styleUrls: ['./promocode-list.component.css']
})
export class PromocodeListComponent implements OnInit {
  authenticationResponse!: AuthenticationResponse;

  constructor(private promocodeService:PromocodeService,private router:Router,public dialog: MatDialog) { }

  promocodes!:Promocode[];
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null||this.authenticationResponse.userRole!='admin'){
      this.router.navigate(['plan-list']);
    }
    this.viewAllPromocodes();
  }
  viewAllPromocodes():void{
    this.promocodeService.viewAllPromocodes().subscribe(
      data=>{  this.promocodes=data;}
      )
  }
  addPromocode() {
    const dialogRef = this.dialog.open(AddPromocodeComponent, {
      width: '40%',
      height: '75%'
    });
  }
  editPromocode(promocode:Promocode){
    const dialogRef = this.dialog.open(EditPromocodeComponent, {
      width: '40%',
      height: '75%',
      data: {
        promocode:promocode.promocode,
      }
    });
  }

  deletePromocode(promocode:Promocode){
    var answer = window.confirm("Delete promocode? "+promocode.promocode);
    if(answer){

      this.promocodeService.deletePromocodeByPromocode(promocode.promocode).subscribe
      (data=>{console.log(data);
      });
      window.location.reload();
    }
    else{
      alert("delete failed!");
    }
  }
}
