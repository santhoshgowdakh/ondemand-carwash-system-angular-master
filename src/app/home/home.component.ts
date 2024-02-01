import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../user/AuthenticationResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }
  authenticationResponse!:AuthenticationResponse;
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
   
  }
  signOut(){
    window.localStorage.clear();
    this.router.navigate(['home']);
    window.location.reload();
  }

}
