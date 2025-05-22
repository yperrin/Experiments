export class PluginInfoConsumerModel {
    name: string;
    queueState: string;
    queueMessageCount: number;
    queueConsumerCount: number;
    lastRun: Date;

    public constructor(init?: Partial<PluginInfoConsumerModel>) {
        Object.assign(this, init);
    }
}
