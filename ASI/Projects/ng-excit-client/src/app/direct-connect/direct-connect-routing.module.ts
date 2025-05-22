import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectConnectComponent } from './components/direct-connect.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoginComponent } from './components/login/login.component';
import { OrderCreationComponent } from './components/order-creation/order-creation.component';
import { ProductIntegrationComponent } from './components/product-integration/product-integration.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { ServiceLoginComponent } from './components/service-login/service-login.component';


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
      path: 'product-integration/:id/:name',
      component: ProductIntegrationComponent
    },
    {
      path: 'service-login/:id/:name',
      component: ServiceLoginComponent
    },
    {
      path: 'order-status/:id/:name',
      component: OrderStatusComponent
    },
    {
      path: 'order-creation/:id/:name',
      component: OrderCreationComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DirectConnectRoutingModule { }
