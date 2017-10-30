import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from './supplier.model';
import { SupplierDataSource } from './supplier.datasource';
import { Sort } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './tool-inventory.component.html',
  styleUrls: [ './tool-inventory.component.less' ],
})
export class ToolInventoryComponent implements OnInit {
  private searchTerms = new Subject<string>();
  originalDataSource: SupplierDataSource;
  supplierDatasource: SupplierDataSource;
  @ViewChild('searchBox') searchInput;

  ngOnInit(): void {
    const self = this;
    this.supplierDatasource = new SupplierDataSource([
      new Supplier({identifier: 1, asiNumber: '123451',   name: 'name1', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 2, asiNumber: '123452',   name: 'name2', lastRun: new Date('01/02/2016')}),
      new Supplier({identifier: 3, asiNumber: '123453',   name: 'name3', lastRun: new Date('01/03/2016')}),
      new Supplier({identifier: 4, asiNumber: '123454',   name: 'name4', lastRun: new Date('02/01/2016')}),
      new Supplier({identifier: 5, asiNumber: '123455',   name: 'name5', lastRun: new Date('02/02/2016')}),
      new Supplier({identifier: 6, asiNumber: '123456',   name: 'name6', lastRun: new Date('02/03/2016')}),
      new Supplier({identifier: 7, asiNumber: '123457',   name: 'name7', lastRun: new Date('03/01/2016')}),
      new Supplier({identifier: 8, asiNumber: '123458',   name: 'name8', lastRun: new Date('03/02/2016')}),
      new Supplier({identifier: 9, asiNumber: '123459',   name: 'name9', lastRun: new Date('03/03/2016')}),
      new Supplier({identifier: 10, asiNumber: '1234510', name: 'name10', lastRun: new Date('04/01/2016')}),
      new Supplier({identifier: 11, asiNumber: '1234511', name: 'name11', lastRun: new Date('04/02/2016')}),
      new Supplier({identifier: 12, asiNumber: '123452',   name: 'name2', lastRun: new Date('04/03/2016')}),
      new Supplier({identifier: 13, asiNumber: '123453',   name: 'name3', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 14, asiNumber: '123454',   name: 'name4', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 15, asiNumber: '123455',   name: 'name5', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 16, asiNumber: '123456',   name: 'name6', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 17, asiNumber: '123457',   name: 'name7', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 18, asiNumber: '123458',   name: 'name8', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 19, asiNumber: '123459',   name: 'name9', lastRun: new Date('01/01/2016')}),
      new Supplier({identifier: 20, asiNumber: '1234510', name: 'name10', lastRun: new Date('01/01/2016')}),
    ]);
    this.originalDataSource = this.supplierDatasource;
    this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .subscribe(
        function (term) {
          const data =  self.originalDataSource
            .data.slice()
            .filter(supplier => supplier.name.toLowerCase().indexOf(term) > -1 || supplier.asiNumber.toLowerCase().indexOf(term) > -1);
          self.supplierDatasource = new SupplierDataSource(data);
        },
        function (err) {
        },
        function () {
          self.supplierDatasource = new SupplierDataSource(self.originalDataSource.data);
        });
  }

  hovered(supplier: Supplier, selected: boolean) {
    supplier.hover = selected;
  }

  searchWrapperClicked($event) {
    this.searchInput.nativeElement.focus();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.supplierDatasource = new SupplierDataSource(this.originalDataSource.data);
      return;
    }
    const data = this.supplierDatasource.data.slice();
    this.supplierDatasource = new SupplierDataSource( data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'asiNumber': return this.compare(a.asiNumber, b.asiNumber, isAsc);
        case 'lastRun': return this.compare(a.lastRun, b.lastRun, isAsc);
        default: return 0;
      }
    }));
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
