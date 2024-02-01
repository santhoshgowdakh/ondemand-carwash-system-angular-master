import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';
import { UserDto } from './userdto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: UserDto;

  constructor(private userService: UserService, private router: Router) { }
  authenticationResponse!: AuthenticationResponse
  userDetails: any
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse==null){
      this.router.navigate(['login']);
    }
    // this.userService.getUserById(10001).subscribe((user) => {


    // const userId = localStorage.getItem("userId");
    // const user = localStorage.getItem("loggedInUser");
    // console.log(user)
    const userId = 38;
    this.userService.getUserById(this.authenticationResponse.userId).subscribe((user: UserModel) => {

      // this.authenticationResponse = JSON.parse(String(window.localStorage.getItem("loggedInUser")));
      // if (this.authenticationResponse == null) {
      //   this.router.navigate(['login']);
      // }
      // this.userService.getUserById(this.authenticationResponse.userId).subscribe((user) => {

        console.log("User Details ");
        console.log(user);
        this.user = user;
      });

    this.userService.getUserById(this.authenticationResponse.userId).subscribe((user: UserModel) => {
      console.log("User Details ");
      console.log(user);
      this.userDetails = user;
    });
  }

  onBack() {
    this.router.navigate(['CarComponent']);
  }

  onDelete(){
    
  }
}

