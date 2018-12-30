import { Services } from './services.model';

export class SupplierConfig {
    id: number;
    asiNumber: number;
    loginInstruction: string;
    services: Services;
    //Login: Services;
    //Order: Order;
    overallTimings: number;    

    public constructor(init?:Partial<SupplierConfig>) {
        Object.assign(this, init);
    }
}