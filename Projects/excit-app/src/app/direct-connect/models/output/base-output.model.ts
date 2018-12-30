export class BaseOutputModel {
    clientTimings: number;
    serverTimings: number;
    supplierTimings: number;

    public constructor(init?:Partial<BaseOutputModel>) {
        Object.assign(this, init);
    }
}