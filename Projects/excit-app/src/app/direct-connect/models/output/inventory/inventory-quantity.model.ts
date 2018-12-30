export class InventoryQuantityModel {
    location: string;
    value: number;
    label: string;
    partCode: string;
    partDescription: string;

    public constructor(init?:Partial<InventoryQuantityModel>) {
        Object.assign(this, init);
    }    
}