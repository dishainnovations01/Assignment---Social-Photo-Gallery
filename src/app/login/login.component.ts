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

  }

  login(){
    let data ={
      userId: this.userId,
      password: this.password
    }
    this.loginservice.login(data).subscribe(
      result =>{
        console.log(result)
        this.rooute.navigateByUrl('/dashboard?userId='+result._id)
      },
      (err: HttpErrorResponse) => {
        this.openSnackBar('Cannot Like image.', 'ERROR');
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
