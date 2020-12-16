import { Component, OnInit,ViewChild} from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {EmployeeAddComponent} from './addEmployee-dialog'
import {HomeComponent} from './home/home.component'
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(HomeComponent) private _child!:HomeComponent;
  ngOnInit(): void {
   
  }
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  title = 'manager-app';

}
