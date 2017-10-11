import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDashboardComponent } from './hero-dashboard/hero-dashboard.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { path: 'dashboard', component: HeroDashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class HeroesRoutingModule {}
