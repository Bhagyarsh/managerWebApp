import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'

@NgModule({
  imports: [
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class MaterialModule {}
