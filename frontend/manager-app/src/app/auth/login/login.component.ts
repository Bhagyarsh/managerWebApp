import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { LoginResponse } from './loginResponse.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginRequestError = false;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit(from: NgForm) {
    console.log(from.value);

    // this.onLogin({ email: 'bhagyarsh@gmail.com', password: 'bhagyarsh31' });
    if (from.valid){
      this.onLogin(from.value);
    }
    
  }
  private onLogin(authdata: { email: string; password: string }) {
    this.http
      .post<LoginResponse>('http://127.0.0.1:8000/api/v1/auth/jwt', authdata)
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.auth.setuserdata(
            responseData['expires'].toString(),
            responseData['user'].toString(),
            responseData['token'].toString()
          );
          if (this.auth.isuser()) {
            this.router.navigate(['/home']);
          }
        },
        (errors) => {
          console.log('error');
          console.log(errors);
          console.log(errors.status);
          this.loginRequestError = true;
        }
      );
  }
}
