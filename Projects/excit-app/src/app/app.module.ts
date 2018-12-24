import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'

import { MaterialModule } from './material.module';
import { DirectConnectComponent } from './direct-connect/direct-connect.component';
import { SupplierListComponent } from './direct-connect/supplier-list/supplier-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectConnectComponent,
    SupplierListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
