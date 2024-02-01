import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car';
import { CarModel } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  carUrl = "http://localhost:8082/car/"

  constructor(private http: HttpClient) { }
  getCarsByCustomerId(userId: number): Observable<Car[]> {
    return this.http.get<Car[]>(this.carUrl + "customer/" + userId)
  }
  viewAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carUrl + "list");
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get('http://localhost:8082/car/id/' + carId);
  }

  getCarList(): Observable<Array<CarModel>> {
    return this.http.get<Array<CarModel>>(this.carUrl+'list');
  }

  saveCarList(model: any) {
    return this.http.post('http://localhost:8082/car/save', model);
  }
  deleteSelectedCar(id: any) {
    return this.http.delete('http://localhost:8082/car/' + id);
  }

  saveEditedData(model: any) {
    return this.http.put('http://localhost:8082/car/update', model);
  }


}
