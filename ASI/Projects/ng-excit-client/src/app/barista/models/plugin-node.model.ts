import { PluginDiagnosticsModel } from './plugin-diagnostics.model';
import { PluginNodeConfigModel } from './plugin-node-config.model';
import { PluginNodeInfoModel } from './plugin-node-info.model';

export class PluginNodeModel {
    name: string;
    node: string;
    nodeCount: number;
    firstNode = false;
    status: string;
    version: string;
    isMonitored: boolean;
    hasApi: boolean;
    showDetails = false;
    diagnostics: PluginDiagnosticsModel;
    config: PluginNodeConfigModel;
    info: PluginNodeInfoModel;

    constructor(init?: Partial<PluginNodeModel>) {
        Object.assign(this, init);
    }

    setConfig(config: PluginNodeConfigModel): void {
        this.config = config;
        this.showDetails = this.config != null && this.info != null;
    }

    setInfo(info: PluginNodeInfoModel) {
        this.info = info;
        this.showDetails = this.config != null && this.info != null;
    }
}
