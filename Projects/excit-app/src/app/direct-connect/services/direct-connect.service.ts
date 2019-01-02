import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '../models/supplier.model';
import { SupplierConfig } from '../models/config/supplierConfig.model';
import { ServiceDetail } from '../models/config/serviceDetail.model';
import { Services } from '../models/config/services.model';
import { InventoryOutputModel } from '../models/output/inventory/inventory-ouput.model';

const endpoints = { 'Production': 'https://dc.asicentral.com/v1/', 'UAT': 'https://dc.uat-asicentral.com/v1/', 'Stage': 'https://dc.stage-asicentral.com/v1/' };

@Injectable({
  providedIn: 'root'
})
export class DirectConnectService {
  private environment = 'Production';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })};

  constructor(private http: HttpClient) { }

  setEnvironment(environment: string): void {
    this.environment = environment;
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<any[]>(endpoints[this.environment] + 'suppliers').pipe(
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

  getConfig(id: number): Observable<SupplierConfig> {
    return this.http.get<any>(endpoints[this.environment] + 'suppliers/' + id + '/config').pipe(
      map(obj => {
        let config = new SupplierConfig({
          id: id,
          asiNumber: obj.AsiNumber,
          services: new Services(),
          loginInstruction: obj.LoginInstruction,
          overallTimings: obj.OverallTimings
        });
        if (obj.Services) {
          if (obj.Services.Inventory) {
            config.services.inventory = new ServiceDetail({
              available: obj.Services.Inventory.Available,
              url: obj.Services.Inventory.Url,
              implementation: obj.Services.Inventory.Implementation
            });
          }
        }
        return config;
      }));
  }
  getInventory(id: number, productJson: string): Observable<InventoryOutputModel> {
    let input = '{ "Client" : "Angular Client", "Company": { "CompanyId":' + id + '}, "Products":[' + productJson + ']';
    let start = Date.now();
    return this.http.post<any>(endpoints[this.environment] + 'products/inventory', input, this.httpOptions).pipe(
      map(obj => {
        let output = new InventoryOutputModel({
            clientTimings: Date.now() - start,
            serverTimings: obj.OverallTimings,
            supplierTimings: obj.SupplierTimings,
        })
        if (obj.ProductQuantities) {
            obj.ProductQuantities.foreach(objProductQuantity => {
              
            });
        }
        return output;
      })
    );
  }
}
