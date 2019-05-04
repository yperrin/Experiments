import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ParentChildComponent } from './parent-child/parent-child.component';
import { AppRoutingModule } from './app-routing.module';
import { ParentChildChildComponent } from './parent-child/parent-child-child/parent-child-child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferencesComponent } from './references/references.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ObservableComponent } from './observable/observable.component';
import { JavascriptComponent } from './javascript/javascript.component';
import { ObservableChildComponent } from './observable/observable-child/observable-child.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentChildComponent,
    ParentChildChildComponent,
    ReferencesComponent,
    ReactiveFormComponent,
    ObservableComponent,
    ObservableChildComponent,
    JavascriptComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
