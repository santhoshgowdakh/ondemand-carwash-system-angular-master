import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationResponse } from './AuthenticationResponse';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Component({

  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobileNumber', 'edit', 'delete'];
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  loading: boolean = false;

  constructor(private userService: UserService, public dialog: MatDialog, private router: Router) { }
  authenticationResponse!: AuthenticationResponse;
  ngOnInit() {
    this.authenticationResponse=JSON.parse(String(window.localStorage.getItem("loggedInUser")));
    if(this.authenticationResponse!=null&&this.authenticationResponse.userRole=='admin'){
    this.getUserData();
    }else{
      this.router.navigate(['plan']);
    }
  }

  private getUserData() {
    this.userService.getUserList()
      .subscribe((users) => {
        console.log(users);
        this.loading = true;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
      });

  }

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

  onEditUser(selectedRow: any) {
    console.log(selectedRow);
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '60%',
      height: '50%',
      data: {
        firstName: selectedRow.firstName,
        lastName: selectedRow.lastName,
        mobileNumber: selectedRow.mobileNumber,
        email: selectedRow.email,
        age: selectedRow.age,
        userName: selectedRow.userName,
        userId: selectedRow.userId,
        userRole: selectedRow.userRole,
        addressDto: selectedRow.addressDto,


      }

    })
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.getUserData();
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;

    })

  }

  onDeleteUser(selectedRow: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '20%',
      height: '20%',
      data: {
        id: selectedRow.userId
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.getUserData();
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;

    });


  }

}


