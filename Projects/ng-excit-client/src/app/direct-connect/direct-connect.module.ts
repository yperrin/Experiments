import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectConnectRoutingModule } from './direct-connect-routing.module';
import { DirectConnectComponent } from './components/direct-connect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';


@NgModule({
  declarations: [
    DirectConnectComponent,
    SupplierListComponent,
    InventoryComponent,
    InventoryListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    DirectConnectRoutingModule
  ]
})
export class DirectConnectModule { }
