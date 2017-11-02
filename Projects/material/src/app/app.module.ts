import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material.module';

import { HeroesRoutingModule } from './heroes/heroes-routing.module';
import { AppComponent } from './app.component';
import { HeroService } from './heroes/shared/hero.service';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { HeroDashboardComponent } from './heroes/hero-dashboard/hero-dashboard.component';
import { HeroPreviewComponent } from './heroes/hero-preview/hero-preview.component';
import { HeroSearchComponent } from './heroes/hero-search/hero-search.component';

import { ToolModule } from './tool/tool.module';
import { ToolInventoryComponent } from './tool/tool-inventory/tool-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroListComponent,
    HeroDashboardComponent,
    HeroPreviewComponent,
    HeroSearchComponent,
    ToolInventoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HeroesRoutingModule
  ],
  providers: [
    HeroService
  ],
  bootstrap: [
    //AppComponent
    ToolInventoryComponent
  ]
})
export class AppModule { }
