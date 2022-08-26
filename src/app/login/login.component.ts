import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userId: string = ""
password: string = ""
  constructor(private loginservice: LoginService,
    private _snackBar: MatSnackBar,
    private rooute: Router
    ) { }

  ngOnInit() {
    let userDataId = localStorage.getItem("user") || "";
    if(userDataId!=""){
      this.rooute.navigateByUrl('/dashboard')
    }
  }

  login(){
    let data ={
      userId: this.userId,
      password: this.password
    }
    this.loginservice.login(data).subscribe(
      result =>{
        localStorage.setItem("user",result._id);
        this.rooute.navigateByUrl('/dashboard')
      },
      (err: HttpErrorResponse) => {
        this.openSnackBar('Username or Password is incorrect!.', 'ERROR');
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
