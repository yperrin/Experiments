import { PluginNodeModel } from './plugin-node.model';

export class PluginModel {
    name: string;
    nodes: PluginNodeModel[];

    public constructor(init?:Partial<PluginModel>) {
        Object.assign(this, init);
        if (!this.nodes) this.nodes = [];
    }  
}