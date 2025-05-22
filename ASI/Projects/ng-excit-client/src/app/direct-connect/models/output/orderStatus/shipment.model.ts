export class ShipmentModel {
    complete: boolean;
    fromAddress: string;
    toAddress: string;
    numberOfPackages: number;
    numberOfItems: number;

    public constructor(init?: Partial<ShipmentModel>) {
        Object.assign(this, init);
    }
}
