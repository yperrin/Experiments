export class Supplier {
    id: number;
    name: string;
    asiNumber: string;
    hasInventory: boolean;
    hasLogin: boolean;
    hasOrderStatus: boolean;
    hasOrderStatusImplementation: boolean;
    hasOrderShipmentImplementation: boolean;
    hasOrderCreation: boolean;
    hasProductIntegration: boolean;
    hasServiceProviderLogin: boolean;

    public constructor(init?: Partial<Supplier>) {
        Object.assign(this, init);
    }
}