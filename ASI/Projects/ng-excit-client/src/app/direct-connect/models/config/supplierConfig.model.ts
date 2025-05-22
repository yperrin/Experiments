import { Services } from './services.model';
import { LoginConfig } from './loginConfig.model';
import { OrderConfig } from './orderConfig.model';

export class SupplierConfigModel {
    id: number;
    name: string;
    asiNumber: number;
    loginInstructions: string;
    services: Services;
    loginConfig: LoginConfig;
    orderConfig: OrderConfig;
    overallTimings: number;

    public constructor(init?:

        Partial<SupplierConfigModel>) {
        Object.assign(this, init);
        if (!this.loginConfig) {
            this.loginConfig = new LoginConfig();
        }
        if (!this.orderConfig) {
            this.orderConfig = new OrderConfig();
        }
    }
}
