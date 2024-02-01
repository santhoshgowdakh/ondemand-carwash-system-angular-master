import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: UserService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSaveEditedData() {
    this.data = {
      addressDto: {
        addressId: this.data.addressDto.addressId,
        city: this.data.addressDto.city,
        pincode: this.data.addressDto.pincode,
        state: this.data.addressDto.state,
        street: this.data.addressDto.street
      },
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      mobileNumber: this.data.mobileNumber,
      email: this.data.email,
      age: this.data.age,

      userId: this.data.userId,
      userRole: this.data.userRole,
    }
    this.service.saveEditedData(this.data).subscribe((res: any) => {
      console.log(res);
    })
  }



}
