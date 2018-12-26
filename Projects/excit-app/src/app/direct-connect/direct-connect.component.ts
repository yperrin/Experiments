import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectConnectService } from './services/direct-connect.service';
import { Supplier } from './models/supplier.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SupplierListComponent } from './supplier-list/supplier-list.component';

@Component({
  selector: 'direct-connect',
  templateUrl: './direct-connect.component.html',
  styleUrls: ['./direct-connect.component.css']
})
export class DirectConnectComponent implements OnInit {
  @ViewChild(SupplierListComponent) supplierList: SupplierListComponent;
  suppliers: Observable<Supplier[]>;
  environment = 'Production';

  constructor(private directConnectService: DirectConnectService) {
  }

  ngOnInit() {
    this.suppliers = this.directConnectService.getSuppliers(this.environment);
  }

  onEnvironmentChange(environment: string): void {
    this.suppliers = this.directConnectService.getSuppliers(environment);
    this.supplierList.updateList(this.suppliers);
  }
}
