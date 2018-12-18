export class Supplier {
    id: number;
    name: string;
    asiNumber: string;
    hasInventory: boolean;
    hasLogin: boolean;
    hasOrderCreation: boolean;
    hasProductUpdate: boolean;

    public constructor(init?:Partial<Supplier>) {
        Object.assign(this, init);
    }
}