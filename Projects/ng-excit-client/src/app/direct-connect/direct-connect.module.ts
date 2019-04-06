import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DirectConnectComponent } from './direct-connect.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ProductIntegrationComponent } from './product-integration/product-integration.component';
import { OrderCreationComponent } from './order-creation/order-creation.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { DirectConnectRoutingModule } from './direct-connect-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DirectConnectComponent,
    SupplierListComponent,
    InventoryComponent,
    LoginComponent,
    OrderStatusComponent,
    ProductIntegrationComponent,
    OrderCreationComponent,
    InventoryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    DirectConnectRoutingModule
  ],
  exports: [
  ]
})
export class DirectConnectModule { }
