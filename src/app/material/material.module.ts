import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatButtonModule, 
          MatButtonToggleModule, 
          MatDatepickerModule, 
          MatDialogModule, 
          MatFormFieldModule, 
          MatIconModule, 
          MatInputModule, 
          MatNativeDateModule, 
          MatPaginatorModule, 
          MatTableModule, 
          MatToolbarModule, 
          MatTooltipModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
