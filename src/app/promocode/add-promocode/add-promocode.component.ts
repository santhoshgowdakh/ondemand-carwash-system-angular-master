import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/user/AuthenticationResponse';
import { PromocodeService } from '../promocode.service';

@Component({
  selector: 'app-add-promocode',
  templateUrl: './add-promocode.component.html',
  styleUrls: ['./add-promocode.component.css']
})
export class AddPromocodeComponent implements OnInit {

  constructor(private router:Router,private promocodeService:PromocodeService,public dialog: MatDialog) { }
  authenticationResponse!:AuthenticationResponse;
  addPromocodeForm!:FormGroup;
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['plan']);
    }
    this.addPromocodeForm= new FormGroup({
      promocode: new FormControl('' ,Validators.required),
      discount: new FormControl('', Validators.required),
      promocodeDescription: new FormControl('',Validators.required)
    });

    
  }

  addPromocode(){
    console.log(this.addPromocodeForm.value);
    this.promocodeService.addPromocode(this.addPromocodeForm.value).subscribe
    (data=>{console.log(data);
      this.dialog.closeAll();
      window.location.reload();
    });
  }

  
  get promocode(){
    return this.addPromocodeForm.get('promocode');
   }
   get promocodeDescription(){
    return this.addPromocodeForm.get('promocodeDescription');
   }
   get discount(){
    return this.addPromocodeForm.get('discount');
   }
   

}
