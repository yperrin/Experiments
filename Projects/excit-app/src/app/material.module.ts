import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule, } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule, 
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
