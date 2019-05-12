import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { ParentChildComponent } from './parent-child/parent-child.component';
import { ParentChildChildComponent } from './parent-child/parent-child-child/parent-child-child.component';
import { ReferencesComponent } from './references/references.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ObservableComponent } from './observable/observable.component';
import { JavascriptComponent } from './javascript/javascript.component';
import { ObservableChildComponent } from './observable/observable-child/observable-child.component';
import { CrudTemplateComponent } from './crud-template/crud-template.component';
import { SimpleAddEditComponent } from './crud-template/simple-add-edit/simple-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentChildComponent,
    ParentChildChildComponent,
    ReferencesComponent,
    ReactiveFormComponent,
    ObservableComponent,
    ObservableChildComponent,
    JavascriptComponent,
    CrudTemplateComponent,
    SimpleAddEditComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [
    SimpleAddEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
