import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeAll, flatMap, concatAll, reduce } from 'rxjs/operators';
import { PluginNodeModel } from '../models/plugin-node.model';
import { PluginDiagnosticsModel } from '../models/plugin-diagnostics.model';

const endpoints = {
    'Production': 'http://asi-barpn1-02a.asinetwork.local:8080/api/',
    'UAT': 'http://asi-barun1-02a.asinetwork.local:8080/api/',
    'Stage': 'http://asi-barsn1-02.asinetwork.local:8080/api/'
};
const header = {
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

    getPlugins(): Observable<PluginNodeModel[]> {
        return this.http.get<any[]>(endpoints[this.environment] + 'cluster/plugins', header).pipe(
            map(objPlugin => objPlugin.filter(objPlugin => objPlugin.Name.includes('Excit') || objPlugin.Name.includes('ProductUpdates'))),
            map(obj => obj.map(objPlugin => {
                return objPlugin.Nodes.map(node => {
                    let pluginNode = new PluginNodeModel({
                        name: objPlugin.Name,
                        node: node.Node,
                        nodeCount: objPlugin.Nodes.length,
                        status: node.Status,
                        version: node.Version,
                        isMonitored: node.IsMonitored,
                        hasApi: node.HasApi
                    });
                    if (node.Diagnostics) {
                        let pluginDiagnostics = new PluginDiagnosticsModel({
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
                })), [])
        );
    }
}  