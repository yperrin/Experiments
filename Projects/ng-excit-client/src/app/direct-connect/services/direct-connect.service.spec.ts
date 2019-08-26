import { TestBed } from '@angular/core/testing';
import { DirectConnectService } from './direct-connect.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject } from '@angular/core/testing';

import data from '../../../assets/data/direct-connect.json';
import { EnvironmentService } from 'src/app/shared/environment.service';

describe('DirectConnectService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DirectConnectService, EnvironmentService],
            imports: [HttpClientTestingModule]
        });
        data.use = false;
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it('Should process the supplier data',
        inject([HttpTestingController, DirectConnectService],
            (httpMock: HttpTestingController, service: DirectConnectService) => {

            // call getSuppliers()
            service.getSuppliers$('Production').subscribe(suppliers => {
                expect(suppliers.length).toBe(3);
            });

            // set expectations for the httpMock
            const req = httpMock.expectOne(DirectConnectService.endpoints.Production + 'suppliers');
            expect(req.request.method).toEqual('GET');

            // set the mock data to be returned
            req.flush(data.suppliers);
        })
    );

    it('Should retrieve supplier config',
        inject([HttpTestingController, DirectConnectService],
            (httpMock: HttpTestingController, service: DirectConnectService) => {

            // call getConfig
            service.getConfig$(1).subscribe(supplierConfig => {
                expect(supplierConfig).toBeDefined();
                expect(supplierConfig.services.inventory.available).toEqual(true);
                expect(supplierConfig.overallTimings).toBeGreaterThan(0);
            });

            // set expectations for the httpMock
            const req = httpMock.expectOne(DirectConnectService.endpoints.Production + 'suppliers/1/config');
            expect(req.request.method).toEqual('GET');

            // set the mock data to be returned
            req.flush(data.config);
        })
    );

    it('Should return inventory',
        inject([HttpTestingController, DirectConnectService],
            (httpMock: HttpTestingController, service: DirectConnectService) => {

        // call getConfig
        service.getInventory$(1786, '{"Number":"3126"}').subscribe(inventory => {
            expect(inventory).toBeDefined();
            expect(inventory.quantities.length).toBeGreaterThanOrEqual(1);
            expect(inventory.supplierTimings).toBeGreaterThan(0);
            expect(inventory.serverTimings).toBeGreaterThan(0);
        });

        // set expectations for the httpMock
        const req = httpMock.expectOne(DirectConnectService.endpoints.Production + 'products/inventory');
        expect(req.request.method).toEqual('POST');

        // set the mock data to be returned
        req.flush(data.inventory);
    }));

    it('Should call Login',
    inject([HttpTestingController, DirectConnectService],
        (httpMock: HttpTestingController, service: DirectConnectService) => {

        // call login
        service.login$(1786, 'name', 'password').subscribe(login => {
            expect(login).toBeTruthy();
            expect(login.isValid).toBeTruthy();
        });

        // set expectations for the httpMock
        const req = httpMock.expectOne(DirectConnectService.endpoints.Production + 'users/validate');
        expect(req.request.method).toEqual('POST');

        // set the mock data to be returned
        req.flush(data.login);
    }));
    it('Should return orderStatus and all the data loaded',
        inject([HttpTestingController, DirectConnectService],
            (httpMock: HttpTestingController, service: DirectConnectService) => {

        // call OrderStatus
        service.getOrderStatus$(1786, 'POTest', 'name', 'password').subscribe(orderStatus => {
            expect(orderStatus).toBeTruthy();
            expect(orderStatus.supplierTimings).toBeTruthy();
            expect(orderStatus.order).toBeTruthy();
            expect(orderStatus.order.poNumber).toEqual('1000');
            expect(orderStatus.order.statuses.length).toEqual(1);
            const statusRecord = orderStatus.order.statuses[0];
            expect(statusRecord.status).toEqual('In Storage');
            expect(statusRecord.statusDescription).toEqual('Order is complete, but vendor is waiting to ship goods');
            expect(statusRecord.shipments).toBeDefined();
            expect(statusRecord.shipments.length).toEqual(1);
            const shipmentRecord = statusRecord.shipments[0];
            expect(shipmentRecord.complete).toBeTruthy();
            expect(shipmentRecord.fromAddress).toBeTruthy();
            expect(shipmentRecord.fromAddress.length).toBeGreaterThan(0);
            expect(shipmentRecord.fromAddress.split(',').length).toEqual(6);
            expect(shipmentRecord.toAddress).toBeTruthy();
            expect(shipmentRecord.toAddress.length).toBeGreaterThan(0);
            expect(shipmentRecord.toAddress.split(',').length).toEqual(6);
            expect(shipmentRecord.numberOfPackages).toBe(2);
            expect(shipmentRecord.numberOfItems).toBe(7);
        });

        // set expectations for the httpMock
        const req = httpMock.expectOne(DirectConnectService.endpoints.Production + 'orders/status');
        expect(req.request.method).toEqual('POST');

        // set the mock data to be returned
        req.flush(data.orderStatus);
    }));

    it('Testing reduce', () => {
        const items = [{name: 'test1', quantity: 3}, {name: 'test2', quantity: 5}];
        const total = items.reduce( (compound, current) => compound + current.quantity, 0);
        expect(total).toEqual(8);
    });
});
