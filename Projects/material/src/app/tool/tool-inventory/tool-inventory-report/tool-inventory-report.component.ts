import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component ({
  selector: 'tool-inventory-report',
  // template: 'this is a test',
  templateUrl: './tool-inventory-report.component.html',
  styleUrls: [ './tool-inventory-report.component.less' ]
})
export class ToolInventoryReportComponent {
  constructor(public dialogRef: MatDialogRef<ToolInventoryReportComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
