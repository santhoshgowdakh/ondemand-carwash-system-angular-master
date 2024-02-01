import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserComponent } from '../user/create-user/create-user.component';
import { UserService } from '../user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '../user/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthenticationResponse } from '../user/AuthenticationResponse';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobileNumber', 'edit', 'delete'];
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  loginForm!:FormGroup;
  show:boolean=false;
  user!: string;
  authenticationResponse!:AuthenticationResponse;
  constructor(private userService: UserService, public dialog: MatDialog,private router:Router) { }

  ngOnInit(): void {
    // const user=window.localStorage.getItem('loggedInUser');
    // this.user=String(user);
    // console.log(this.user);
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
  if(this.authenticationResponse!=null){
    this.router.navigate(['place-order']);
  }
 const userId=Number(window.localStorage.getItem('userId'))

if(userId){
  this.router.navigate(['plan']);
}
    this.loginForm= new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required),
    });
  }
  public items: { field: string }[] = [
    { field: 'Option 1' },
    { field: 'Option 2' },
    { field: 'Option 3' }
];
 
onAddUser() {
  const dialogRef = this.dialog.open(CreateUserComponent, {
    width: '60%',
    height: '50%'
  });

  dialogRef.afterClosed().subscribe(res => {
    console.log(res);
    this.getUserData();
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;

  });
}
logIn(){
  const dialogRef = this.dialog.open(LoginComponent, {
    
  });

}

  expand(){
    this.show=!this.show;
  }
  private getUserData() {
    this.userService.getUserList()
      .subscribe((users: Array<UserModel>) => {
        console.log(users);
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
      });

  }
}
