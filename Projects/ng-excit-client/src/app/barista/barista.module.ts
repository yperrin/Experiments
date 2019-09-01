import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaristaRoutingModule } from './barista-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { BaristaComponent } from './components/barista.component';
import { PluginListComponent } from './components/plugin-list/plugin-list.component';
import { BaristaShortNamePipe } from './pipes/barista-short-name';


@NgModule({
  declarations: [
    BaristaComponent,
    PluginListComponent,
    BaristaShortNamePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    BaristaRoutingModule
  ]
})
export class BaristaModule { }
