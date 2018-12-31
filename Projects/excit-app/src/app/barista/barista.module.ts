import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaristaComponent } from './barista.component';
import { BaristaRoutingModule } from './barista-routing.module';
import { MaterialModule } from '../material.module';
import { PluginListComponent } from './plugin-list/plugin-list.component';

@NgModule({
  declarations: [
    BaristaComponent,
    PluginListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BaristaRoutingModule
  ]
})
export class BaristaModule { }
