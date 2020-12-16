import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { RegisterModel } from './register.model';
import { RegisterResponse } from './registerResponse.model';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog'

import {RegisterSuccessComponent} from "./registerSuccess-dialog"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {}
  onSubmit(from: NgForm) {
  


    console.log(from.value);
    const data = from.value;
    if (from.valid) {
      const data = from.value;
      data.dob = moment(data.dob).format('YYYY-MM-DD');
      console.log(data);
      this.onRegister(data)

    }
  }

  private onRegister(Registerdata:RegisterModel) {
    this.http
      .post<RegisterResponse>(
        'http://127.0.0.1:8000/api/v1/auth/jwt/register',
        Registerdata
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.auth.setuserdata('', '', '');
          const dialogRef = this.dialog.open(RegisterSuccessComponent);
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        },
        (errors) => {
          console.log('error');
          console.log(errors);
          console.log(errors.status);
        }
      );
  }
}
