import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; 
import { DeviceDetectorService } from 'ngx-device-detector';
import { DirectConnectService } from './services/direct-connect.service';
import { Supplier } from './models/supplier.model';
import { Action } from './models/action.model';
import { Observable } from 'rxjs';
import { SupplierListComponent } from './supplier-list/supplier-list.component';

@Component({
  selector: 'direct-connect',
  templateUrl: './direct-connect.component.html',
  styleUrls: ['./direct-connect.component.css']
})
export class DirectConnectComponent implements OnInit {
  @ViewChild(SupplierListComponent) supplierList: SupplierListComponent;
  @ViewChild('search') searchElement: ElementRef;
  suppliers: Observable<Supplier[]>;
  searchText: string = '';

  constructor(private directConnectService: DirectConnectService, private router: Router) {
  }

  ngOnInit() {
    this.suppliers = this.directConnectService.getSuppliers();
    if (this.searchElement) this.searchElement.nativeElement.focus();
  }

  onEnvironmentChange(environment: string): void {
    this.directConnectService.setEnvironment(environment);
    this.suppliers = this.directConnectService.getSuppliers();
    this.supplierList.updateList(this.suppliers);
    if (this.searchElement) this.searchElement.nativeElement.focus();
    this.router.navigate(['']);
  }

  applyFilter(filterValue: string) {
    this.supplierList.filterList(filterValue.trim().toLowerCase());
  }

  showPreview(action: Action) {
    this.router.navigate([action.type, action.companyId, action.companyName]);
  }
}
