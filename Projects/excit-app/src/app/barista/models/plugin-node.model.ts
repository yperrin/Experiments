import { PluginDiagnosticsModel } from './plugin-diagnostics.model';

export class PluginNodeModel {
    name: string;
    node: string;
    status: string;
    version: string;
    isMonitored: boolean;
    hasApi: boolean;
    diagnostics: PluginDiagnosticsModel;

    public constructor(init?:Partial<PluginNodeModel>) {
        Object.assign(this, init);
    } 
}