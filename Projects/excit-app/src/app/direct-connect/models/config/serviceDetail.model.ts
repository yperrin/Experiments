export class ServiceDetail {
    available: boolean;
    url: string;
    implementation: string;

    public constructor(init?:Partial<ServiceDetail>) {
        Object.assign(this, init);
    }
}