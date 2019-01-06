import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InventoryOutputModel } from '../../models/output/inventory/inventory-ouput.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnDestroy {
  inventoryOutput: InventoryOutputModel;
  inventoryDataSource = new MatTableDataSource();
  inventorySubscription: Subscription;

  constructor() { }

  loadData(output: Observable<InventoryOutputModel>) {
    if (this.inventorySubscription) this.inventorySubscription.unsubscribe();
    if (output) {
      this.inventorySubscription = output.subscribe(data => {
        this.inventoryOutput = data;
        this.inventoryDataSource.data = data.quantities;
      });
    }
    else {
      this.inventoryOutput = null;
      this.inventoryDataSource.data = null;
    }
  }
  ngOnDestroy(): void {
    if (this.inventorySubscription) this.inventorySubscription.unsubscribe();
  }
}