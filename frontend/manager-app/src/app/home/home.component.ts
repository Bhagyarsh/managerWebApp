import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { EmployeeListModel } from './employeeList.model';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddComponent } from '../addEmployee-dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'JWT ' + this.auth.getusertoken(),
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<EmployeeListModel>();
  displayedColumns: string[] = [
    'emp_id',
    'first name',
    'last name',
    'company',
    'mobile',
    'delete',
    'edit',
  ];
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}
    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.dataSource.paginator = this.paginator;
    }
  ngOnInit(): void {
    if (!this.auth.isuser()) {
      this.router.navigate(['']);
    }
    this.getandsetEmployeeList();
  }
  delete(element: EmployeeListModel) {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      data: {
        add: false,
        edit: false,
        delete: true,
        employee: element,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }
  edit(element: EmployeeListModel) {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      data: {
        add: false,
        edit: true,
        delete: false,
        employee: element,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }
  private getandsetEmployeeList() {
    console.log(this.reqHeader);

    this.http
      .get<any>('http://127.0.0.1:8000/api/v1/employees', {
        headers: this.reqHeader,
      })
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.dataSource.data = responseData;
        },
        (errors) => {
          console.log('error');
          console.log(errors);
          console.log(errors.status);
        }
      );
  }
  refresh(): void {
    this.ngOnInit();
  }
  addEmployee() {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      data: {
        add: true,
        edit: false,
        delete: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  onlogout() {
    this.auth.setuserdata('', '', '');
    this.router.navigate(['']);
  }
}
