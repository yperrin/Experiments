import { Component, OnInit } from '@angular/core';
import { DirectConnectService } from './services/direct-connect.service';
import { Supplier } from './models/supplier.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'direct-connect',
  templateUrl: './direct-connect.component.html',
  styleUrls: ['./direct-connect.component.css']
})
export class DirectConnectComponent implements OnInit {
  suppliers: Observable<Supplier[]>;

  constructor(private directConnectService: DirectConnectService) { }

  ngOnInit() {
    this.suppliers = this.directConnectService.getSuppliers();
  }

}
