import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { CarModel } from './car.model';
import { CarService } from './car.service';
import { CreateCarComponent } from './create-car/create-car.component';
import { DeleteCarComponent } from './delete-car/delete-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';


@Component({

  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],

})
export class CarComponent implements OnInit {
  displayedColumns: string[] = ['carId', 'carModel', 'carBrand', 'carRegistrationNumber', 'carColor',
    'carImage', 'carLocation', 'edit', 'delete','view'];
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(private carService: CarService, public dialog: MatDialog,private router:Router) { }
  authenticationResponse!:AuthenticationResponse;
  ngOnInit() {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null||this.authenticationResponse.userRole=='washer'){
      this.router.navigate(['plan-list']);
    }
    if(this.authenticationResponse!=null&&this.authenticationResponse.userRole=='customer'){

      this.getCarData();
    }
    if(this.authenticationResponse!=null&&this.authenticationResponse.userRole=='admin'){
      this.getAllCarData();
    }
  }
  getAllCarData(){
    this.carService.getCarList()
    .subscribe((cars) => {
      console.log(cars);
      this.dataSource = new MatTableDataSource(cars);
      this.dataSource.paginator = this.paginator;
    });
  }

   getCarData() {
    this.carService.getCarsByCustomerId(this.authenticationResponse.userId)
      .subscribe((cars) => {
        console.log(cars);
        this.dataSource = new MatTableDataSource(cars);
        this.dataSource.paginator = this.paginator;
      });

  }

  private getCarById(){
  //this.carService.getCarById(this.)
  }

  onAddCar() {
    const dialogRef = this.dialog.open(CreateCarComponent, {
      width: '50%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.getCarData();
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;

    });
  }

  onEditCar(selectedRow: any) {
    console.log(selectedRow);
    const dialogRef = this.dialog.open(EditCarComponent, {
      width: '60%',
      height: '50%',
      data: {
        carBrand: selectedRow.carBrand,
        carColor: selectedRow.carColor,
        carId: selectedRow.carId,
        carImage: selectedRow.carImage,
        carModel: selectedRow.carModel,
        carLocation: selectedRow.carLocation,
        userId: selectedRow.userId,
        carRegistrationNumber: selectedRow.carRegistrationNumber,
        addressDto: selectedRow.addressDto,


      }

    })
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.getCarData();
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;

    })

  }

  onDeleteCar(selectedRow: any) {
    const dialogRef = this.dialog.open(DeleteCarComponent, {
      width: '20%',
      height: '20%',
      data: {
        id: selectedRow.carId

      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.getCarData();
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;

    });


  }

}


