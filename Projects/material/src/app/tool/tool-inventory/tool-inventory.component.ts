import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from './supplier.model';
import { SupplierDataSource } from './supplier.datasource';

@Component({
  selector: 'app-root',
  templateUrl: './tool-inventory.component.html',
  styleUrls: [ './tool-inventory.component.less' ],
})
export class ToolInventoryComponent implements OnInit {
  supplierDatasource: SupplierDataSource;
  displayedColumns = ['name'];
  @ViewChild('searchBox') searchInput;

  ngOnInit(): void {
    this.supplierDatasource = new SupplierDataSource([
      new Supplier({identifier: 1, asiNumber: '123451',   name: 'name1', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 2, asiNumber: '123452',   name: 'name2', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 3, asiNumber: '123453',   name: 'name3', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 4, asiNumber: '123454',   name: 'name4', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 5, asiNumber: '123455',   name: 'name5', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 6, asiNumber: '123456',   name: 'name6', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 7, asiNumber: '123457',   name: 'name7', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 8, asiNumber: '123458',   name: 'name8', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 9, asiNumber: '123459',   name: 'name9', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 10, asiNumber: '1234510', name: 'name10', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 11, asiNumber: '1234511', name: 'name11', lastRun: new Date('01/01/2016')}),
    ]);
  }

  hovered(supplier: Supplier, selected: boolean) {
    supplier.hover = selected;
  }

  searchWrapperClicked($event) {
    this.searchInput.nativeElement.focus();
  }
}
