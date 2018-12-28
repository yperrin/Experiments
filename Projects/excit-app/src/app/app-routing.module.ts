import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectConnectComponent } from './direct-connect/direct-connect.component';

const routes: Routes = [
  { path: '', redirectTo: '/supplier-list', pathMatch: 'full' },
  { path: 'supplier-list', component: DirectConnectComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
