import { CollectionViewer } from '@angular/cdk/collections/typings';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Rx';

import { Supplier } from './supplier.model';

export class SupplierDataSource extends DataSource<Supplier> {

  constructor(private suppliers: Supplier[]) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Supplier[]> {
    return Observable.of(this.suppliers);
  }
  disconnect(collectionViewer: CollectionViewer): void {
    // nothing to do
  }

  get data(): Supplier[] {
    return this.suppliers;
  }

  resetSelection() {
    this.suppliers.forEach(supplier => supplier.selected = false);
  }

  get hasSelection(): boolean {
      return this.suppliers.reduce(function(hasSelected, value) {
        return hasSelected || value.selected ; }, false);
  }
}
