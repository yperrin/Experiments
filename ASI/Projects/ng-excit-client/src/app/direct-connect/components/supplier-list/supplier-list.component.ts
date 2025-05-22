// tslint:disable-next-line: max-line-length
import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Supplier } from '../../models/supplier.model';
import { Action } from '../../models/action.model';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, OnChanges {
  @Input() suppliers: Supplier[];
  @Input() filter: string;
  @Output() notify: EventEmitter<Action> = new EventEmitter<Action>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  suppliersDataSource = new MatTableDataSource();

  constructor() { }

  ngOnInit() {
    this.suppliersDataSource.sort = this.sort;
    this.suppliersDataSource.data = this.suppliers;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.suppliers) {
      this.suppliersDataSource.data = changes.suppliers.currentValue;
    } else if (changes.filter) {
      this.suppliersDataSource.filter = changes.filter.currentValue;
    }
  }

  showAction(action: Action) {
    this.notify.emit(action);
  }
}
