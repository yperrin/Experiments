import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectConnectComponent } from './direct-connect/direct-connect.component';
import { InventoryComponent } from './direct-connect/inventory/inventory.component';
import { LoginComponent } from './direct-connect/login/login.component';
import { OrderStatusComponent } from './direct-connect/order-status/order-status.component';
import { OrderCreationComponent } from './direct-connect/order-creation/order-creation.component';
import { ProductIntegrationComponent } from './direct-connect/product-integration/product-integration.component';

const routes: Routes = [ { 
    path: '', 
    component: DirectConnectComponent,
    children: [
      {
        path:'inventory/:id/:name',
        component: InventoryComponent
      },
      {
        path:'login/:id',
        component: LoginComponent
      },
      {
        path:'order-status/:id',
        component: OrderStatusComponent
      },
      {
        path:'order-creation/:id',
        component: OrderCreationComponent
      },
      {
        path:'product-integration/:id',
        component: ProductIntegrationComponent
      },
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
