import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { Supplier } from '../models/supplier.model';
import { SupplierConfigModel } from '../models/config/supplierConfig.model';
import { ServiceDetail } from '../models/config/serviceDetail.model';
import { Services } from '../models/config/services.model';
import { InventoryOutputModel } from '../models/output/inventory/inventory-ouput.model';
import { InventoryQuantityModel } from '../models/output/inventory/inventory-quantity.model';
import { LoginOutputModel } from '../models/output/login/login-output.model';
import { OrderStatusOutputModel } from '../models/output/orderStatus/order-status-ouput.model';
import { OrderStatusModel } from '../models/output/orderStatus/order-status.model';
import { SupplierOrderModel } from '../models/output/orderStatus/supplier-order.model';

import data from '../../../assets/data/direct-connect.json';
import { ShipmentModel } from '../models/output/orderStatus/shipment.model';
import { EnvironmentService } from 'src/app/shared/environment.service';

@Injectable({
  providedIn: 'root'
})
export class DirectConnectService {
  static readonly endpoints = {
    Production: 'https://dc.asicentral.com/v1/',
    UAT: 'https://dc.uat-asicentral.com/v1/',
    Stage: 'https://dc.stage-asicentral.com/v1/'
  };
  static readonly client = 'Angular Test Client';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private initialized = false;
  private supplierListSubject = new Subject<Supplier[]>();
  supplierList$: Observable<Supplier[]> = this.supplierListSubject.asObservable();

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
  }

  init(): void {
    if (!this.initialized) {
      this.environmentService.environment$.pipe(
        switchMap(env => this.getSuppliers$(env))
      ).subscribe(suppliers => {
        this.supplierListSubject.next(suppliers);
      });
      this.initialized = true;
    } else {
      this.environmentService.refresh();
    }
  }

  getSuppliers$(environment: string): Observable<Supplier[]> {
    const list$ = data.use ? of(data.suppliers) : this.http.get<any[]>(DirectConnectService.endpoints[environment] + 'suppliers');
    return list$.pipe(
      take(1),
      map(obj => obj.map(supp => {
        const supplier = new Supplier({
          id: supp.CompanyId,
          name: supp.CompanyName,
          asiNumber: supp.AsiNumber,
          hasInventory: supp.HasInventory,
          hasLogin: supp.HasLogin,
          hasOrderStatus: supp.HasOrderStatus,
          hasOrderStatusImplementation: supp.HasOrderStatusImplementation,
          hasOrderShipmentImplementation: supp.HasOrderShipmentImplementation,
          hasOrderCreation: supp.HasOrderCreation,
          hasProductIntegration: supp.HasProductIntegration,
          hasServiceProviderLogin: supp.HasServiceProviderLogin
        });
        return supplier;
      }))
    );
  }

  getConfig$(id: number, name: string = null): Observable<SupplierConfigModel> {
    const configData$ = data.use ? of(data.config) :
      this.http.get<any>(DirectConnectService.endpoints[this.environmentService.getEnvironment()] + 'suppliers/' + id + '/config');
    return configData$.pipe(
      take(1),
      map(obj => {
        const config = new SupplierConfigModel({
          id,
          name,
          asiNumber: obj.AsiNumber,
          services: new Services(),
          loginInstructions: obj.LoginInstruction,
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
          if (obj.Services.LoginValidate) {
            config.services.loginValidate = new ServiceDetail({
              available: obj.Services.LoginValidate.Available,
              url: obj.Services.LoginValidate.Url,
              implementation: obj.Services.LoginValidate.Implementation
            });
          }
          if (obj.Services.OrderStatus) {
            config.services.orderStatus = new ServiceDetail({
              available: obj.Services.OrderStatus.Available,
              url: obj.Services.OrderStatus.Url,
              implementation: obj.Services.OrderStatus.Implementation
            });
          }
          if (obj.Services.OrderCreation) {
            config.services.orderCreation = new ServiceDetail({
              available: obj.Services.OrderCreation.Available,
              url: obj.Services.OrderCreation.Url,
              implementation: obj.Services.OrderCreation.Implementation
            });
          }
          if (obj.Services.ProductIntegration) {
            config.services.productIntegration = new ServiceDetail({
              available: obj.Services.ProductIntegration.Available,
              url: obj.Services.ProductIntegration.Url,
              implementation: obj.Services.ProductIntegration.Implementation
            });
          }
        }
        if (obj.Login && obj.Login.Properties) {
          const props = obj.Login.Properties;
          if (props.AccountNumber) {
            config.loginConfig.accountNumberRequired = (props.AccountNumber.required === 'true');
          }
          if (props.Password) {
            config.loginConfig.passwordRequired = (props.Password.required === 'true');
          }
          if (props.Username) {
            config.loginConfig.usernameRequired = (props.Username.required === 'true');
          }
        }
        if (obj.Order) {
          config.orderConfig.warehouseRequired = obj.Order.WarehouseRequired;
          config.orderConfig.warehouseAvailable = obj.Order.WarehouseAvailable;
        }
        return config;
      }
      ));
  }

  getInventory$(id: number, productJson: string): Observable<InventoryOutputModel> {
    const input = '{ "Client" : "' + DirectConnectService.client + 
    '", "Company": { "CompanyId":' + id + '}, "Products":[' + productJson + ']';
    const start = Date.now();
    const inventory$ = data.use ?
      of(data.inventory) :
      this.http.post<any>(DirectConnectService.endpoints[this.environmentService.getEnvironment()] + 
      'products/inventory', input, this.httpOptions);
    return inventory$.pipe(
      take(1),
      map(obj => {
        const output = new InventoryOutputModel({
          clientTimings: Date.now() - start,
          serverTimings: obj.OverallTimings,
          supplierTimings: obj.SupplierTimings,
        });
        if (obj.ProductQuantities) {
          obj.ProductQuantities.forEach(objProductQuantity => {
            if (objProductQuantity.Quantities) {
              objProductQuantity.Quantities.forEach(objQuantity => {
                const quantity = new InventoryQuantityModel({
                  productIdentifier: objProductQuantity.ProductIdentifier,
                  productDescription: objProductQuantity.ProductDescription,
                  partCode: objQuantity.PartCode,
                  partDescription: objQuantity.PartDescription,
                  label: objQuantity.Label,
                  location: objQuantity.Location,
                  value: objQuantity.Value
                });
                output.quantities.push(quantity);
              });
            }
          });
        }
        return output;
      })
    );
  }

  login$(id: number, username: string, password = '', accountNumber = ''): Observable<LoginOutputModel> {
    const credentials = '{' + this.getCredentials(username, password, accountNumber) + '}';
    const input = '{ "Client" : "' + DirectConnectService.client + 
    '", "Company": { "CompanyId":' + id + '}, "UserCredentials": ' + credentials + '}';
    const start = Date.now();
    const login$ = data.use ? of(data.login) :
      this.http.post<any>(DirectConnectService.endpoints[this.environmentService.getEnvironment()] + 
      'users/validate', input, this.httpOptions);
    return login$.pipe(
      take(1),
      map(obj => new LoginOutputModel({
        clientTimings: Date.now() - start,
        serverTimings: obj.OverallTimings,
        supplierTimings: obj.SupplierTimings,
        isValid: obj.IsValid,
      })
      ));
  }

  getOrderStatus$(id: number, poNumber: string, username: string, password = '', accountNumber = ''): Observable<OrderStatusOutputModel> {
    const credentials = '{' + this.getCredentials(username, password, accountNumber) + '}';
    const input = '{ "Client" : "' + DirectConnectService.client + '", "Company": { "CompanyId":' + id + '}, "UserCredentials": ' +
      credentials + ', "PONumbers":["' + poNumber + '"]}';
    const start = Date.now();
    const statusData$ = data.use ?
      of(data.orderStatus) :
      this.http.post<any>(DirectConnectService.endpoints[this.environmentService.getEnvironment()] + 
      'orders/status', input, this.httpOptions);
    return statusData$.pipe(
      take(1),
      map(obj => {
        const orderStatus = new OrderStatusOutputModel({
          clientTimings: Date.now() - start,
          serverTimings: obj.OverallTimings,
          supplierTimings: obj.SupplierTimings,
        });
        if (obj.Orders && obj.Orders.length > 0) {
          // only parse first order as UI only allow for one PO Number
          orderStatus.order = new OrderStatusModel({ poNumber: obj.Orders[0].PONumber });
          if (obj.Orders[0].Statuses) {
            obj.Orders[0].Statuses.forEach(status => {
              const supplierStatus = new SupplierOrderModel({
                identifier: status.Identifier,
                status: status.Status,
                statusDescription: status.StatusDescription,
                expectedDeliveryDate: status.ExpectedDeliveryDate,
                expectedShipDate: status.ExpectedShipDate,
                lastupdatedDate: status.LastUpdatedDate,
              });
              orderStatus.order.statuses.push(supplierStatus);
              if (status.ShipmentLocations) {
                status.ShipmentLocations.forEach(shipmentLocation => {
                  const shipment = new ShipmentModel({
                    complete: shipmentLocation.Complete,
                    fromAddress: this.getAddress(shipmentLocation.ShipFromAddress),
                    toAddress: this.getAddress(shipmentLocation.ShipToAddress),
                  });
                  // count number of packages and number of items for each packages
                  shipment.numberOfPackages = 0;
                  shipment.numberOfItems = 0;
                  if (shipmentLocation.Packages) {
                    shipment.numberOfPackages += shipmentLocation.Packages.length;
                    shipmentLocation.Packages
                      .filter(shipPackage => shipPackage.Items)
                      .forEach(shipPackage => {
                        shipment.numberOfItems = shipPackage.Items.reduce(
                          (total, item) => total + (item.Quantity ? item.Quantity : 0), shipment.numberOfItems
                        );
                      });
                  }
                  supplierStatus.shipments.push(shipment);
                });
              }
            });
          }
        }
        return orderStatus;
      })
    );
  }

  private getAddress(address: any): string {
    let addressValue = null;
    if (address) {
      addressValue = address.Address1 ? address.Address1 : '';
      addressValue += address.Address2 ? ',' + address.Address2 : '';
      addressValue += address.Address3 ? ',' + address.Address3 : '';
      addressValue += address.Address4 ? ',' + address.Address4 : '';
      addressValue += address.City ? ',' + address.City : '';
      addressValue += address.Region ? ',' + address.Region : '';
      addressValue += address.PostalCode ? ',' + address.PostalCode : '';
      addressValue += address.Country ? ',' + address.Country : '';
    }
    return addressValue;
  }

  private getCredentials(username: string, password = '', accountNumber = ''): string {
    let credentials = '';
    if (!!accountNumber) {
      credentials += '"AccountNumber": "' + accountNumber + '"';
    }
    if (!!username) {
      if (credentials.length > 0) {
        credentials += ',';
      }
      credentials += '"Username": "' + username + '"';
    }
    if (!!password) {
      if (credentials.length > 0) {
        credentials += ',';
      }
      credentials += '"Password": "' + password + '"';
    }
    return credentials;
  }
}
