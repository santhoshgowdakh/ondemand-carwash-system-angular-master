import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/user/AuthenticationResponse';
import { Promocode } from '../promocode';
import { PromocodeService } from '../promocode.service';

@Component({
  selector: 'app-edit-promocode',
  templateUrl: './edit-promocode.component.html',
  styleUrls: ['./edit-promocode.component.css']
})
export class EditPromocodeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router:Router,private route:ActivatedRoute,private promocodeService:PromocodeService,public dialog: MatDialog) { }
  authenticationResponse!:AuthenticationResponse;
  editPromocodeForm!:FormGroup;
  promocodeObj!:Promocode;
  ngOnInit(): void {
    console.log(this.data);
    const promocode=this.data.promocode;
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['plan-list']);
    }
    this.editPromocodeForm= new FormGroup({
      promocode: new FormControl('' ,Validators.required),
      promocodeDescription: new FormControl('',Validators.required),
      discount: new FormControl('',Validators.required)
    });
    this.getPromocodeByPromocode(promocode);
  }
  updatePromocode(){
    console.log(this.editPromocodeForm.value);
    this.promocodeService.updatePromocode(this.editPromocodeForm.value).subscribe
    (data=>{console.log(data);
      this.dialog.closeAll();
      window.location.reload();
    });
  }
  getPromocodeByPromocode(promocode:string):void {
   this.promocodeService.getPromocodeByPromocode(promocode).subscribe(
          data=>{this.promocodeObj=data;
            this.editPromocodeForm.patchValue({
              promocode:this.promocodeObj.promocode,
              promocodeDescription:this.promocodeObj.promocodeDescription,
              discount:this.promocodeObj.discount
            });}
    )
    }
    get promocode(){
      return this.editPromocodeForm.get('promocode');
     }
     get promocodeDescription(){
      return this.editPromocodeForm.get('promocodeDescription');
     }
     get discount(){
      return this.editPromocodeForm.get('discount');
     }

}
