import { TestBed, inject } from '@angular/core/testing';
import { BaristaService } from './barista.services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PluginNodeModel } from '../models/plugin-node.model';

import data from '../../../assets/data/barista.json';
import { EnvironmentService } from 'src/app/shared/environment.service';

describe('BaristaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BaristaService, EnvironmentService],
            imports: [HttpClientTestingModule]
        });
        data.use = false;
    });

    afterEach(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
            httpMock.verify();
    }));

    it('Should process the plugins data',
        inject([HttpTestingController, BaristaService],
            (httpMock: HttpTestingController, service: BaristaService) => {

        service.getList$('Production').subscribe(plugins => {
            expect(plugins.length).toBe(16);
            expect(plugins[0].name).toBe('ASI.Barista.Plugins.Excit.InventoryReport.Plugin');
            expect(plugins[0].firstNode).toBe(true);
            expect(plugins[1].firstNode).toBe(false);
            expect(plugins[2].name).toBe('ASI.Barista.Plugins.Excit.OrderReport.Plugin');
        });

        // set expectations for the httpMock
        httpMock.expectOne({
            url: BaristaService.endpoints.Production + 'cluster/plugins',
            method: 'GET'
        })
        .flush(data.plugins);
    }));

    it('Should process Plugin Info and config',
    inject([HttpTestingController, BaristaService],
        (httpMock: HttpTestingController, service: BaristaService) => {

        const pluginNode = new PluginNodeModel({
            name: 'ASI.Barista.Plugins.Excit.InventoryReport.Plugin',
            node: 'asi-barpn3-02a.asinetwork.local:8080'
        });

        service.retrievePluginDetails$(pluginNode).subscribe(plugin => {
            expect(plugin.info).toBeTruthy();
            expect(plugin.info.consumers).toBeTruthy();
            expect(plugin.info.consumers.length).toBe(1);
            expect(plugin.info.consumers[0].name).toBeTruthy();
            expect(plugin.info.consumers[0].lastRun).toBeTruthy();
            expect(plugin.info.consumers[0].queueConsumerCount).toBe(2);

            expect(plugin.info.schedules).toBeTruthy();
            expect(plugin.info.schedules.length).toBe(1);
            expect(plugin.info.schedules[0]).toBe('EXCIT Reports - Daily 0730');

            expect(plugin.config).toBeTruthy();
            expect(plugin.config.getPropertyNames()).toBeTruthy();
            expect(plugin.config.getPropertyNames().length).toBe(5);
            // tslint:disable-next-line: max-line-length
            expect(plugin.config.getProperty('EsbConnectionString')).toBe('host=asi-rmqpc-0xa.asinetwork.local;username=asiuser;password=asiuser;requestedHeartbeat=120');
            expect(plugin.config.getProperty('SmtpFrom')).toBe('yperrin@asicentral.com');
        });

        // set expectations for the httpMock
        httpMock
            .expectOne({
                url: 'http://' + pluginNode.node + '/api/plugins/ASI.Barista.Plugins.Excit.InventoryReport.Plugin/info',
                method: 'GET'
            })
            .flush(data.info);

        httpMock
            .expectOne({
                url: 'http://' + pluginNode.node + '/api/plugins/ASI.Barista.Plugins.Excit.InventoryReport.Plugin/config',
                method: 'GET'
            })
            .flush(data.config);
    }));
});
