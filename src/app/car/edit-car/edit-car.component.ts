import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from '../car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  model: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: CarService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSaveEditedData() {
    this.data = {
      // addressDto: {
      //   addressId: this.data.addressDto.addressId,
      //   city: this.data.addressDto.city,
      //   pincode: this.data.addressDto.pincode,
      //   state: this.data.addressDto.state,
      //   street: this.data.addressDto.street
      // },
      carBrand: this.data.carBrand,
      carColor: this.data.carColor,
      carId: this.data.carId,
      carImage: this.data.carImage,
      carModel: this.data.carModel,
      carLocation: this.data.carLocation,
      userId: this.data.userId,
      carRegistrationNumber: this.data.carRegistrationNumber,
    }
    this.service.saveEditedData(this.data).subscribe((res: any) => {
      console.log(res);
    })

  }

}
