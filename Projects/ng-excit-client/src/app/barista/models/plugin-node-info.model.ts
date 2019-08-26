import { PluginInfoConsumerModel } from './plugin-info-consumer.model';

export class PluginNodeInfoModel {
    schedules: string[];
    consumers: PluginInfoConsumerModel[];
    url: string;

    public constructor(init?: Partial<PluginNodeInfoModel>) {
        Object.assign(this, init);
        if (!this.consumers) {
            this.consumers = [];
        }
    }
}
