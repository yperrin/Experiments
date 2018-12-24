import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  @Input() suppliers: Observable<Supplier[]>;
  @ViewChild(MatSort) sort: MatSort;
  suppliersDataSource = new MatTableDataSource();

  constructor() { }
  
  ngOnInit() {
    this.suppliersDataSource.sort = this.sort;
    this.suppliers.subscribe(data => this.suppliersDataSource.data = data);
  }
}
