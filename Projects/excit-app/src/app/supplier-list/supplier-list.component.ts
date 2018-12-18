import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Supplier } from '../supplier';
import { DirectConnectService } from '../direct-connect.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  suppliersDataSource = new MatTableDataSource();

  constructor(private directConnectService: DirectConnectService) { }
  
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    this.suppliersDataSource.sort = this.sort;
    this.directConnectService.getSuppliers().subscribe(data => this.suppliersDataSource.data = data);
  }
}
