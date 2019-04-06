import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './material.module';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DirectConnectModule } from './direct-connect/direct-connect.module';
import { BaristaModule } from './barista/barista.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    SharedModule.forRoot(),
    DirectConnectModule,
    BaristaModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
