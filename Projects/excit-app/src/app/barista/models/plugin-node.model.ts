import { PluginDiagnosticsModel } from './plugin-diagnostics.model';

export class PluginNodeModel {
    name: string;
    node: string;
    nodeCount: number;
    status: string;
    version: string;
    isMonitored: boolean;
    hasApi: boolean;
    diagnostics: PluginDiagnosticsModel;
    scheduleName: string;

    public constructor(init?: Partial<PluginNodeModel>) {
        Object.assign(this, init);
    }
}
