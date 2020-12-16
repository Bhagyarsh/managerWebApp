import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-success',
  templateUrl: './registerSuccess-dialog.html',

})
export class RegisterSuccessComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  Redirecttologin(){
    this.router.navigate(['']);
  }
}
