import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, concat, BehaviorSubject } from 'rxjs';
import { map, reduce, take, last, switchMap } from 'rxjs/operators';
import { PluginNodeModel } from '../models/plugin-node.model';
import { PluginDiagnosticsModel } from '../models/plugin-diagnostics.model';
import { PluginNodeInfoModel } from '../models/plugin-node-info.model';
import { PluginNodeConfigModel } from '../models/plugin-node-config.model';
import { PluginInfoConsumerModel } from '../models/plugin-info-consumer.model';

import data from '../../../assets/data/barista.json';
import { EnvironmentService } from 'src/app/shared/environment.service';

@Injectable({
    providedIn: 'root'
})
export class BaristaService {
    static readonly endpoints = {
        Production: 'http://e2-barpn1-03b.asinetwork.local:8080/api/', // 'http://asi-barpn1-02a.asinetwork.local:8080/api/',
        UAT: 'http://asi-barun1-03a.asinetwork.local:8080/api/',
        Stage: 'http://asi-barsn1-02.asinetwork.local:8080/api/'
    };
    static readonly options = {
        withCredentials: true
    };

    private initialized = false;
    private pluginListSubject = new Subject<PluginNodeModel[]>();
    pluginList$: Observable<PluginNodeModel[]> = this.pluginListSubject.asObservable();

    constructor(private http: HttpClient, private environmentService: EnvironmentService) { }

    init(): void {
        if (!this.initialized) {
            this.environmentService.environment$.pipe(
                switchMap(env => this.getList$(env))
            ).subscribe(plugins => {
                this.pluginListSubject.next(plugins);
            });
            this.initialized = true;
        } else {
            this.environmentService.refresh();
        }
    }

    retrievePluginDetails$(plugin: PluginNodeModel): Observable<PluginNodeModel> {
        return concat(this.getPluginInfo$(plugin), this.getPluginConfig$(plugin)).pipe(
            last()
        );
    }

    triggerSchedule(scheduleName: string): void {
        this.http.post(BaristaService.endpoints[this.environmentService.getEnvironment()] +
            'plugins/ASI.Barista.Plugins.Scheduler.SchedulerPlugin/schedules/' +
            encodeURIComponent(scheduleName).replace('*', '%2A') + '/trigger', null, BaristaService.options)
            .pipe(take(1)).subscribe();
    }

    getMonitorUrl(plugin: string | PluginNodeModel): string {
        let url: string;
        if (typeof plugin === 'string') {
            const environment = this.environmentService.getEnvironment();
            url = BaristaService.endpoints[environment];
            url += 'cluster/' + plugin;
        } else {
            url = 'http://' + plugin.node + '/api/plugins/' + plugin.name;
        }
        url += '/monitor?limit=20';
        return url;
    }

    switchPluginStatus(plugin: PluginNodeModel): void {
        const running = plugin.status === 'Running';
        const url = 'http://' + plugin.node + '/api/plugins/' + plugin.name + (running ? '/stop' : '/start');
        this.http.get<any>(url, BaristaService.options).pipe(take(1)).subscribe();
        plugin.status = running ? 'Stopped' : 'Running';
    }

    private getPluginInfo$(plugin: PluginNodeModel): Observable<PluginNodeModel> {
        const url = 'http://' + plugin.node + '/api/plugins/' + plugin.name + '/info';
        const pluginInfoData$ = data.use ? of(data.info) : this.http.get<any>(url, BaristaService.options);
        return pluginInfoData$.pipe(
            take(1),
            map(pluginInfo => {
                const info = new PluginNodeInfoModel({ url });
                if (pluginInfo.RequestedSchedules) {
                    info.schedules = pluginInfo.RequestedSchedules;
                }
                if (pluginInfo.Consumers) {
                    const consumerNames = Object.getOwnPropertyNames(pluginInfo.Consumers);
                    consumerNames.forEach(consumerName => {
                        const pluginConsumer = new PluginInfoConsumerModel({
                            name: consumerName,
                        });
                        if (pluginInfo.Consumers[consumerName].QueueInfo) {
                            pluginConsumer.lastRun = pluginInfo.Consumers[consumerName].QueueInfo.IdleSince;
                            pluginConsumer.queueMessageCount = pluginInfo.Consumers[consumerName].QueueInfo.MessageCount;
                            pluginConsumer.queueState = pluginInfo.Consumers[consumerName].QueueInfo.State;
                            if (pluginInfo.Consumers[consumerName].QueueInfo.Consumers) {
                                pluginConsumer.queueConsumerCount = pluginInfo.Consumers[consumerName].QueueInfo.Consumers.length;
                            }
                        }
                        info.consumers.push(pluginConsumer);
                    });
                }
                plugin.setInfo(info);
                return plugin;
            })
        );
    }

    private getPluginConfig$(plugin: PluginNodeModel): Observable<PluginNodeModel> {
        const url = 'http://' + plugin.node + '/api/plugins/' + plugin.name + '/config';
        const pluginConfigData$ = data.use ? of(data.config) : this.http.get<any>(url, BaristaService.options);
        return pluginConfigData$.pipe(
            take(1),
            map(pluginConfig => {
                const config = new PluginNodeConfigModel({ url });
                if (pluginConfig.AppSettings) {
                    const names = Object.getOwnPropertyNames(pluginConfig.AppSettings);
                    names.forEach(name => {
                        config.addProperty(name, pluginConfig.AppSettings[name]);
                    });
                }
                if (pluginConfig.ConnectionStrings) {
                    const names = Object.getOwnPropertyNames(pluginConfig.ConnectionStrings);
                    names.forEach(name => {
                        config.addProperty(name, pluginConfig.ConnectionStrings[name]);
                    });
                }
                plugin.setConfig(config);
                return plugin;
            })
        );
    }

    getList$(environment: string): Observable<PluginNodeModel[]> {
        const url = BaristaService.endpoints[environment] + 'cluster/plugins';
        const pluginsData$ = data.use ? of(data.plugins) : this.http.get<any[]>(url, BaristaService.options);
        return pluginsData$.pipe(
            take(1),
            map(objPlugin => objPlugin.filter(plugin => plugin.Name.includes('Excit') || plugin.Name.includes('ProductUpdates'))),
            map((obj: any[]) => obj.map(objPlugin => {
                return objPlugin.Nodes.map(node => {
                    const pluginNode = new PluginNodeModel({
                        name: objPlugin.Name,
                        node: node.Node,
                        nodeCount: objPlugin.Nodes.length,
                        status: node.Status,
                        version: node.Version,
                        isMonitored: node.IsMonitored,
                        hasApi: node.HasApi
                    });
                    if (node.Diagnostics) {
                        const pluginDiagnostics = new PluginDiagnosticsModel({
                            date: node.Diagnostics.Date,
                            deploymentDiskUsage: node.Diagnostics.DeploymentDiskUsage,
                            memoryUtilizationPercentage: node.Diagnostics.MemoryUtilizationPercentage,
                            pluginMemory: node.PluginMemory,
                            pluginProcessorTime: this.formatCPU(node.Diagnostics.PluginProcessorTime),
                            survivedBaristaMemory: node.Diagnostics.SurvivedBaristaMemory,
                            totalAllocatedPluginMemory: node.Diagnostics.totalAllocatedPluginMemory
                        });
                        pluginNode.diagnostics = pluginDiagnostics;
                    }
                    return pluginNode;
                });
            }
            )),
            reduce((actual, value) => actual.concat(
                value.reduce((prev, curr) => prev.concat(curr))
            ), []),
            map(pluginNodes => {
                // set firstNode property for each first node of a given plugin
                pluginNodes.forEach((node, index) => {
                    node.firstNode = index === 0 || (index > 0 && node.name !== pluginNodes[index - 1].name);
                });
                return pluginNodes;
            })
        );
    }

    private formatCPU(value: string): string {
        let formattedValue = value;
        if (formattedValue) {
            const pos = formattedValue.indexOf('.');
            if (pos > 0 && pos < formattedValue.length) {
                formattedValue = formattedValue.substring(0, pos);
            }
        }
        return formattedValue;
    }
}
