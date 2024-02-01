import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/user/AuthenticationResponse';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router:Router,private route:ActivatedRoute,private addressService:AddressService,public dialog: MatDialog) { }
  authenticationResponse!:AuthenticationResponse;
  editAddressForm!:FormGroup;
  address!:Address;
  ngOnInit(): void {
    console.log(this.data);
    const id=this.data.addressId;
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['plan']);
    }
    this.editAddressForm= new FormGroup({
      addressId: new FormControl(id ,Validators.required),
      addressName: new FormControl('' ,Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      pincode: new FormControl('',Validators.required),
      userId: new FormControl(this.authenticationResponse.userId,Validators.required),
    });
    this.getAddressById(id);
  }
  updateAddress(){
    console.log(this.editAddressForm.value);
    this.addressService.updateAddress(this.editAddressForm.value).subscribe
    (data=>{console.log(data);
      this.dialog.closeAll();
      window.location.reload();
    });
  }
  getAddressById(id:number):void {
   this.addressService.getAddressByAddressId(id).subscribe(
          data=>{this.address=data;
            this.editAddressForm.patchValue({
              addressId:this.address.addressId,
              addressName:this.address.addressName,
              street:this.address.street,
              city:this.address.city,
              state:this.address.state,
              pincode:this.address.pincode,
              userId:this.address.userId
            });}
    )
    }
  get addressName(){
    return this.editAddressForm.get('addressName');
   }
   get street(){
    return this.editAddressForm.get('street');
   }
   get city(){
    return this.editAddressForm.get('city');
   }
   get state(){
    return this.editAddressForm.get('state');
   }
   get pincode(){
    return this.editAddressForm.get('pincode');
   }


}
