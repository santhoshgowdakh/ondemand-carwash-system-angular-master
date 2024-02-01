import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseMessage } from '../shared/response-message';
import { AuthenticationResponse } from '../user/AuthenticationResponse';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private userService:UserService, public dialog: MatDialog) { }
  loginForm!:FormGroup;
  user!:string;
  ngOnInit(): void {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse!=null){
      this.router.navigate(['place-order']);
    }
    else{
this.loginForm= new FormGroup({
  userName: new FormControl('', Validators.required),
  password: new FormControl('',Validators.required),
});}
  }
authenticationResponse!:AuthenticationResponse;
responseMessage!:ResponseMessage;
  login(){
    console.log(this.loginForm.value);
    this.userService.logIn(this.loginForm.value).subscribe
    (data => {
      // console.log(data);
      if(data instanceof ResponseMessage){
       this.responseMessage=data;
        console.log(this.responseMessage.message)
      }else{

        window.localStorage.setItem('loggedInUser',JSON.stringify(data));
        // this.userType=data.userType;
        this.router.navigate(['place-order']);
        
        
        this.close();
        window.location.reload();
      }
      });
    
  }
  get userName(){
    return this.loginForm.get('userName');
   }
   get password(){
    return this.loginForm.get('password');
   }
   close(){
    this.dialog.closeAll();
   }
}
