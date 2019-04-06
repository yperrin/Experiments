export class InventoryQuantityModel {
    productIdentifier: string;
    productDescription: string;
    partCode: string;
    partDescription: string;
    location: string;
    value: number;
    label: string;

    public constructor(init?: Partial<InventoryQuantityModel>) {
        Object.assign(this, init);
    }
}
