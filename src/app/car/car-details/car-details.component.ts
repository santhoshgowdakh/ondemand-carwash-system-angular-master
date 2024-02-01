import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  data!: Car;
  id!: number;
  constructor(private router: Router, private route: ActivatedRoute, private service: CarService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);
    console.log(this.id)
    this.getCarById();
  }

  getCarById() {
    this.service.getCarById(this.id).subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }

  onBack() {
    this.router.navigate(['CarComponent']);
  }
}
