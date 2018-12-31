export class PluginDiagnosticsModel {
    pluginMemory: string;
    totalAllocatedPluginMemory: string;
    survivedBaristaMemory: string;
    memoryUtilizationPercentage: string;
    pluginProcessorTime: string;
    deploymentDiskUsage: string;
    date: Date;

    public constructor(init?:Partial<PluginDiagnosticsModel>) {
        Object.assign(this, init);
    } 
}