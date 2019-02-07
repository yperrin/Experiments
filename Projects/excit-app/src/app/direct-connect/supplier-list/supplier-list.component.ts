import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import { Action } from '../models/action.model';

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, OnDestroy {
  @Input() suppliers: Observable<Supplier[]>;
  @Output() notify: EventEmitter<Action> = new EventEmitter<Action>();
  @ViewChild(MatSort) sort: MatSort;
  suppliersDataSource = new MatTableDataSource();
  supplierSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.suppliersDataSource.sort = this.sort;
    this.supplierSubscription = this.suppliers.subscribe(data => this.suppliersDataSource.data = data);
  }
  ngOnDestroy(): void {
    if (this.supplierSubscription) {
      this.supplierSubscription.unsubscribe();
    }
  }

  updateList(suppliers: Observable<Supplier[]>) {
    if (this.supplierSubscription) {
      this.supplierSubscription.unsubscribe();
    }
    this.suppliers = suppliers;
    this.supplierSubscription = this.suppliers.subscribe(data => this.suppliersDataSource.data = data);
  }

  filterList(filterValue: string) {
    this.suppliersDataSource.filter = filterValue;
  }

  showAction(action: Action) {
    this.notify.emit(action);
  }
}
