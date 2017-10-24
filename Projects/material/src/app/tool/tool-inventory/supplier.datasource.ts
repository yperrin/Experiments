import { CollectionViewer } from '@angular/cdk/collections/typings';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
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

}
