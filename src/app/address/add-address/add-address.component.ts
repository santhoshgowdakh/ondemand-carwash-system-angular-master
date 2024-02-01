import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/user/AuthenticationResponse';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  constructor(private router:Router,private addressService:AddressService,public dialog: MatDialog) { }
  authenticationResponse!:AuthenticationResponse;
  addAddressForm!:FormGroup;
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['plan-list']);
    }
    this.addAddressForm= new FormGroup({
      addressName: new FormControl('' ,Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      pincode: new FormControl('',Validators.required),
      userId: new FormControl(this.authenticationResponse.userId,Validators.required),
    });

    
  }

  addAddress(){
    console.log(this.addAddressForm.value);
    this.addressService.addAddress(this.addAddressForm.value).subscribe
    (data=>{console.log(data);
      this.dialog.closeAll();
      window.location.reload();
    });
  }

  get addressName(){
    return this.addAddressForm.get('addressName');
   }
   get street(){
    return this.addAddressForm.get('street');
   }
   get city(){
    return this.addAddressForm.get('city');
   }
   get state(){
    return this.addAddressForm.get('state');
   }
   get pincode(){
    return this.addAddressForm.get('pincode');
   }

}
