import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'

import { MaterialModule } from './material.module';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
import { DirectConnectModule } from './direct-connect/direct-connect.module';
import { BaristaModule } from './barista/barista.module';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    DirectConnectModule,
    BaristaModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
