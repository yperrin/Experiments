import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatButtonModule,
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
    MatCheckboxModule
  ],
  exports: [
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule
  ],
})
export class AppMaterialModule { }
