import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { AddAddressComponent } from './add-address/add-address.component';
import { Address } from './address';
import { AddressService } from './address.service';
import { EditAddressComponent } from './edit-address/edit-address.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private addressService:AddressService,public router:Router,public dialog: MatDialog) { }

  addresses!:Address[];
  authenticationResponse!:AuthenticationResponse;
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['plan']);
    }
    this.getUserAddress();
  }

  getUserAddress(){
    this.addressService.viewAllUserAddresss(this.authenticationResponse.userId).subscribe
    (data=>{this.addresses=data;
    });
  }

  addAddress() {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '40%',
      height: '70%'
    });
  }
  editAddress(address:Address){
    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '40%',
      height: '70%',
      data: {
        addressId:address.addressId,
      }
    });
  }
  deleteAddress(address:Address){
    var answer = window.confirm("Delete address? "+address.addressName);
    if(answer){

      this.addressService.deleteAddressByAddressId(address.addressId).subscribe
      (data=>{console.log(data);
      });
      window.location.reload();
    }
    else{
      alert("delete failed!");
    }
  }
}
