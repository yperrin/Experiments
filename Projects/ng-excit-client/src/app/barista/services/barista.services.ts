import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, reduce, mergeMap, flatMap, take } from 'rxjs/operators';
import { PluginNodeModel } from '../models/plugin-node.model';
import { PluginDiagnosticsModel } from '../models/plugin-diagnostics.model';

const endpoints = {
    'Production': 'http://asi-barpn1-02a.asinetwork.local:8080/api/',
    'UAT': 'http://asi-barun1-02a.asinetwork.local:8080/api/',
    'Stage': 'http://asi-barsn1-02.asinetwork.local:8080/api/'
};
const options = {
    withCredentials: true
};

@Injectable({
    providedIn: 'root'
})
export class BaristaService {
    private environment = 'Production';
    constructor(private http: HttpClient) { }

    setEnvironment(environment: string): void {
        this.environment = environment;
    }

    setScheduleName(plugin: PluginNodeModel): Observable<PluginNodeModel> {
        return this.http.get<any>('http://' + plugin.node + '/api/plugins/' + plugin.name + '/info', options).pipe(
            map( pluginInfo => {
                if (pluginInfo.RequestedSchedules) {
                    plugin.scheduleName = pluginInfo.RequestedSchedules[0];
                }
                return plugin;
            })
        );
    }

    triggerSchedule(plugin: PluginNodeModel, scheduleName: string): void {
        this.http.post(endpoints[this.environment] + 'plugins/ASI.Barista.Plugins.Scheduler.SchedulerPlugin/schedules/' +
        encodeURIComponent(scheduleName).replace('*', '%2A') +
        '/trigger', null,
        options)
        .pipe(take(1)).subscribe();
    }

    getPlugins(): Observable<PluginNodeModel[]> {
        let url = endpoints[this.environment] + 'cluster/plugins';
        if (this.environment === 'Production') {
            url += '?zones=excit';
        }
        return this.http.get<any[]>(url, options).pipe(
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
                            pluginProcessorTime: node.Diagnostics.PluginProcessorTime,
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
                value.reduce(function (prev, curr) {
                    return prev.concat(curr);
                })), []),
            flatMap((plugins: PluginNodeModel[]) => forkJoin(plugins.map( plugin => {
                if (plugin.status === 'Running') {
                    return this.setScheduleName(plugin);
                }
                return [plugin];
            })))
        );
    }
}
// also implement http://asi-barsn1-02.asinetwork.local:8080/api/plugins/ASI.Barista.Plugins.Excit.InventoryReport.Plugin/config
