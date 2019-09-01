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
import { LoginComponent } from './components/login/login.component';
import { OrderCreationComponent } from './components/order-creation/order-creation.component';
import { ProductIntegrationComponent } from './components/product-integration/product-integration.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OrderStatusListComponent } from './components/order-status/order-status-list/order-status-list.component';
import { ServiceLoginComponent } from './components/service-login/service-login.component';


@NgModule({
  declarations: [
    DirectConnectComponent,
    SupplierListComponent,
    InventoryComponent,
    InventoryListComponent,
    LoginComponent,
    OrderCreationComponent,
    ProductIntegrationComponent,
    OrderStatusComponent,
    OrderStatusListComponent,
    ServiceLoginComponent
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
