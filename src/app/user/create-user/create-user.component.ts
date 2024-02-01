import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  correctAge = true;
  disableSaveBtn = false;
 
  model: any = {
    addressDto: {
      //addressId: 0,
    }
  };
  constructor(private service: UserService,
    private dialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit() {
  }

  onSaveUser() {
    if (this.model.age < 1) {
      this.correctAge = false;
    }
    console.log("In saveeeeeeeeeee....")
    this.service.saveUserList(this.model).subscribe((res: any) => {
      console.log(res);
      this.dialogRef.close();
      this.disableSaveBtn = true;
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }



}
