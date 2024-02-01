import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from '../car.service';

@Component({
  selector: 'app-delete-car',
  templateUrl: './delete-car.component.html',
  styleUrls: ['./delete-car.component.css']
})
export class DeleteCarComponent implements OnInit {

  constructor(private carService: CarService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteCarComponent>) { }

  ngOnInit(): void {
    console.log(this.data.id);
  }

  onDeleteCarData() {
    this.carService.deleteSelectedCar(this.data.id).subscribe((res: any) => {
      console.log(res);
    })
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}