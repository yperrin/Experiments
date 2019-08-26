import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectConnectComponent } from './components/direct-connect.component';
import { InventoryComponent } from './components/inventory/inventory.component';


const routes: Routes = [{
  path: '',
  component: DirectConnectComponent,
  children: [
    {
      path: 'inventory/:id/:name',
      component: InventoryComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DirectConnectRoutingModule { }
