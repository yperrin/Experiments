import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaristaComponent } from './components/barista.component';

const routes: Routes = [ {
  path: '',
  component: BaristaComponent,
}];

@NgModule({
imports: [
  RouterModule.forChild(routes)
],
exports: [
  RouterModule
]
})
export class BaristaRoutingModule { }
