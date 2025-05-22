import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'barista',
    // loadChildren: () => import('./barista/barista.module').then(m => m.BaristaModule)
    loadChildren: './barista/barista.module#BaristaModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports : [RouterModule]
})
export class AppRoutingModule { }
