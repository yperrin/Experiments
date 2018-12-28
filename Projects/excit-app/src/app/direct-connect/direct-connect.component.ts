import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DirectConnectService } from './services/direct-connect.service';
import { Supplier } from './models/supplier.model';
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
  environment = 'Production';
  searchText = '';
  viewPreview = true;

  constructor(private directConnectService: DirectConnectService) {
  }

  ngOnInit() {
    this.suppliers = this.directConnectService.getSuppliers(this.environment);
    this.searchElement.nativeElement.focus();
  }

  onEnvironmentChange(environment: string): void {
    this.suppliers = this.directConnectService.getSuppliers(environment);
    this.supplierList.updateList(this.suppliers);
  }

  applyFilter(filterValue: string) {
    this.supplierList.filterList(filterValue.trim().toLowerCase());
  }

  previewShow(viewPreview) {
    this.viewPreview = viewPreview;
  }
}
