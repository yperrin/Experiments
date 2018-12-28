import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '../models/supplier.model';

const endpoints = { 'Production': 'https://dc.asicentral.com/v1/', 'UAT': 'https://dc.uat-asicentral.com/v1/', 'Stage': 'https://dc.stage-asicentral.com/v1/' };
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DirectConnectService {
  constructor(private http: HttpClient  ) { }

  getSuppliers(environment: string = 'Production'): Observable<Supplier[]> {
    return this.http.get<any[]>(endpoints[environment] + 'suppliers').pipe(
      map(obj => obj.map(supp => {
        let supplier = new Supplier({
          id: supp.CompanyId,
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
