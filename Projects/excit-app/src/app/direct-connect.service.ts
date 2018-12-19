import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Supplier } from './supplier';
import { SupplierListComponent } from './supplier-list/supplier-list.component';

const endpoint = 'https://dc.asicentral.com/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DirectConnectService {
  
  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<any[]>(endpoint + 'suppliers').pipe(
      map(obj => obj.map(supp => {
        let supplier = new Supplier({
          name: supp.CompanyName, 
          asiNumber: supp.AsiNumber, 
          hasInventory: supp.HasInventory, 
          hasLogin: supp.HasLogin, 
          hasOrderStatus: supp.HasOrderStatus, 
          hasOrderCreation: supp.HasOrderCreation,
          hasProductIntegration: supp.HasProductIntegration
        });
        return supplier;
      }))
    );
  }
}
