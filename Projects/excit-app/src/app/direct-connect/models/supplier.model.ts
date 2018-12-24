export class Supplier {
    id: number;
    name: string;
    asiNumber: string;
    hasInventory: boolean;
    hasLogin: boolean;
    hasOrderStatus: boolean;
    hasOrderCreation: boolean;
    hasProductIntegration: boolean;

    public constructor(init?:Partial<Supplier>) {
        Object.assign(this, init);
    }
}