import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EmployeeModel } from './Employee.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeListModel } from './home/employeeList.model';
@Component({
  selector: 'app-employee-addd',
  templateUrl: './addemployee-dialog.html',
})
export class EmployeeAddComponent implements OnInit {
  dialogstring = '';
  reqHeader = new HttpHeaders();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public passdata: {
      add: boolean;
      edit: boolean;
      delete: boolean;
      employee?: EmployeeListModel;
    },
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}
  employeeform = new FormGroup({});
  ngOnInit(): void {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + this.auth.getusertoken(),
    });

    this.employeeform = new FormGroup({
      emp_id: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
    });
    if (this.passdata.add) {
      this.dialogstring = 'Add Employee data';
    } else if (this.passdata.edit) {
      this.dialogstring = 'Edit Employee data';
      this.intiform();
    } else if (this.passdata.delete) {
      this.dialogstring = 'Delete Employee data';
      this.intiform();
    }
  }

  onSubmit() {
    if (this.passdata.add) {
      console.log(this.employeeform.value);
      if (this.employeeform.valid) {
        const data = this.employeeform.value;
        data.dob = moment(data.dob).format('YYYY-MM-DD');
        console.log(data);
        this.addEmployee(data);
      }
    }
  }
  private intiform() {
    this.http
      .get<EmployeeModel>(
        'http://127.0.0.1:8000/api/v1/employee/' +
          this.passdata.employee!.emp_id,
        { headers: this.reqHeader }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.employeeform.setValue(responseData);
        },
        (errors) => {
          console.log('error');
          console.log(errors);
          console.log(errors.status);
        }
      );
  }
  private addEmployee(EmployeeData: EmployeeModel) {
    this.http
      .post<EmployeeModel>(
        'http://127.0.0.1:8000/api/v1/employee/create',
        EmployeeData,
        { headers: this.reqHeader }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (errors) => {
          console.log('error');
          console.log(errors);
          console.log(errors.status);
        }
      );
  }
  delete() {
    this.http
      .delete<any>(
        'http://127.0.0.1:8000/api/v1/employee/' +
          this.passdata.employee!.emp_id,
        {
          headers: this.reqHeader,
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (errors) => {
          console.log('error');
          console.log(errors);
          console.log(errors.status);
        }
      );
  }
  edit() {
    console.log("===========================");
    
    this.http
      .put<any>(
        'http://127.0.0.1:8000/api/v1/employee/' +
          this.passdata.employee!.emp_id,
          this.employeeform.value,

        {
          headers: this.reqHeader,
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
          console.log("===========================");
        },
        (errors) => {
          console.log('error');
          console.log(errors);
          console.log(errors.status);
        }
      );
  }
}
