import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroService } from './heroes/shared/hero.service';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { HeroDashboardComponent } from './heroes/hero-dashboard/hero-dashboard.component';
import { HeroPreviewComponent } from './heroes/hero-preview/hero-preview.component';
import { HeroesRoutingModule } from './heroes/heroes-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroListComponent,
    HeroDashboardComponent,
    HeroPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesRoutingModule
  ],
  providers: [
    HeroService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
