import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatButtonModule,
  MatSliderModule,
  MatSortModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSliderModule,
    MatSortModule,
    MatCheckboxModule
  ],
  exports: [
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSliderModule,
    MatSortModule,
    MatCheckboxModule
  ],
})
export class AppMaterialModule { }
