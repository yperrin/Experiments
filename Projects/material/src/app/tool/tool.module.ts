import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatButtonModule,
  MatSortModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';

import { ToolInventoryComponent } from './tool-inventory/tool-inventory.component';
import { ToolInventoryReportComponent } from './tool-inventory/tool-inventory-report/tool-inventory-report.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  declarations: [
    ToolInventoryComponent,
    ToolInventoryReportComponent,
    
  ],
  exports: [
    ToolInventoryComponent
  ]
})
export class ToolModule {}
