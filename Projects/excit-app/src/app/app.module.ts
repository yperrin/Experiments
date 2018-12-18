import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ExcitMaterialModule } from './excit-material/excit-material.module';
import { SupplierListComponent } from './supplier-list/supplier-list.component'

@NgModule({
  declarations: [
    AppComponent,
    SupplierListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ExcitMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
