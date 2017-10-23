import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatTableModule,
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule
  ],
})
export class AppMaterialModule { }
