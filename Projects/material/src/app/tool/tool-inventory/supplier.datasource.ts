import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { Supplier } from './supplier.model';

export class SupplierDataSource extends DataSource<Supplier[]> {

  constructor(protected suppliers: Supplier[]) {
    super();
  }

  connect(): Observable<Supplier[][]> {
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.suppliers);
        observer.complete();
      }, 2000); } );
  }

  disconnect(): void {
  }
}
