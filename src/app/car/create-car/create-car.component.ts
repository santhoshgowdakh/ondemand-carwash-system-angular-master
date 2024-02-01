import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationResponse } from 'src/app/user/AuthenticationResponse';
import { CarService } from '../car.service';


@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {
  disableSaveBtn = false;
  model: any = {
    addressDto: {

    }
  };

  constructor(private service: CarService,
    private dialogRef: MatDialogRef<CreateCarComponent>) { }

  ngOnInit(): void {
  }
  authenticationResponse!:AuthenticationResponse;
  onSaveCar() {

    console.log("In saveeeeeeeeeee....");
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    this.model.userId=this.authenticationResponse.userId;
    this.model.carImage="";
    this.model.location="";
    this.service.saveCarList(this.model).subscribe((res: any) => {
      console.log(res);
      this.dialogRef.close();
      this.disableSaveBtn = true;
    });
  }

}
