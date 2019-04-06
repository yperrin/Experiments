import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ParentChildComponent } from './parent-child/parent-child.component';
import { AppRoutingModule } from './app-routing.module';
import { ParentChildChildComponent } from './parent-child/parent-child-child/parent-child-child.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ParentChildComponent,
    ParentChildChildComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
