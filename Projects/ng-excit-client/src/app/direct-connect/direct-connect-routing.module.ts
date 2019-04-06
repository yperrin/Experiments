import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectConnectComponent } from './direct-connect.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderCreationComponent } from './order-creation/order-creation.component';
import { ProductIntegrationComponent } from './product-integration/product-integration.component';

const routes: Routes = [{
    path: '',
    component: DirectConnectComponent,
    children: [
      {
        path: 'inventory/:id/:name',
        component: InventoryComponent
      },
      {
        path: 'login/:id/:name',
        component: LoginComponent
      },
      {
        path: 'order-status/:id/:name',
        component: OrderStatusComponent
      },
      {
        path: 'order-creation/:id/:name',
        component: OrderCreationComponent
      },
      {
        path: 'product-integration/:id/:name',
        component: ProductIntegrationComponent
      },
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DirectConnectRoutingModule { }