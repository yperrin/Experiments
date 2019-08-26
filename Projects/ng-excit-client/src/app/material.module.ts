import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
// tslint:disable-next-line: max-line-length
import {MatSortModule, MatSelectModule, MatInputModule, MatTooltipModule, MatSidenav, MatSidenavModule, MatSidenavContainer, MatSidenavContent, MatListModule, MatNavList, MatListItem, MatInput} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MatSuffix} from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
  ]
})
export class MaterialModule { }
