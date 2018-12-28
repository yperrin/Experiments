import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DirectConnectComponent } from './direct-connect.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { DirectEnvironmentComponent } from './direct-environment/direct-environment.component';

@NgModule({
  declarations: [
    DirectConnectComponent,
    SupplierListComponent,
    DirectEnvironmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class DirectConnectModule { }
