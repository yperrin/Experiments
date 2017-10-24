import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from './supplier.model';
import { SupplierDataSource } from './supplier.datasource';

@Component({
  selector: 'app-root',
  templateUrl: './tool-inventory.component.html',
  styleUrls: [ './tool-inventory.component.css' ],
})
export class ToolInventoryComponent implements OnInit {
  supplierDatasource: SupplierDataSource;
  displayedColumns = ['name'];
  @ViewChild('searchBox') searchInput;

  ngOnInit(): void {
    this.supplierDatasource = new SupplierDataSource([
      new Supplier({Identifier: 1, AsiNumber: '123451',   Name: 'name1', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 2, AsiNumber: '123452',   Name: 'name2', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 3, AsiNumber: '123453',   Name: 'name3', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 4, AsiNumber: '123454',   Name: 'name4', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 5, AsiNumber: '123455',   Name: 'name5', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 6, AsiNumber: '123456',   Name: 'name6', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 7, AsiNumber: '123457',   Name: 'name7', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 8, AsiNumber: '123458',   Name: 'name8', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 9, AsiNumber: '123459',   Name: 'name9', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 10, AsiNumber: '1234510', Name: 'name10', LastRun: new Date('01/01/2016')}),
      new Supplier({Identifier: 11, AsiNumber: '1234511', Name: 'name11', LastRun: new Date('01/01/2016')}),
    ]);
  }

  searchWrapperClicked($event) {
    this.searchInput.nativeElement.focus();
  }
}
