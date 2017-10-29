import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatButtonModule,
  MatSliderModule,
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
    MatCheckboxModule
  ],
})
export class AppMaterialModule { }
