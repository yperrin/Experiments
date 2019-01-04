import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PluginModel } from '../models/plugin.model';
import { PluginNodeModel } from '../models/plugin-node.model';
import { PluginDiagnosticsModel } from '../models/plugin-diagnostics.model';

const endpoints = {
    'Production': 'http://asi-barpn1-02a.asinetwork.local:8080/api/',
    'UAT': 'http://asi-barun1-02a.asinetwork.local:8080/api',
    'Stage': 'http://asi-barsn1-02a.asinetwork.local:8080/api'
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
        return this.http.get<any[]>(endpoints[this.environment] + 'cluster/plugins').pipe(
            map(objPlugin => objPlugin.filter(objPlugin => objPlugin.Name.includes('Excit') || objPlugin.Name.includes('ProductUpdates'))),
            map(obj => obj.map(objPlugin => {
                let pluginNode: PluginNodeModel;
                if (objPlugin.Nodes) {
                    objPlugin.Nodes.forEach(node => {
                        pluginNode = new PluginNodeModel({
                            name: objPlugin.Name,
                            node: node.Node,
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
                    });
                }
                return pluginNode;
            }))
        );
    }
}  