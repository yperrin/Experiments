export class SupplierOrderModel {
    identifier: string;
    status: string;
    statusDescription: string;
    expectedShipDate: Date;
    expectedDeliveryDate: Date;
    lastupdateDate: Date;

    public constructor(init?: Partial<SupplierOrderModel>) {
        Object.assign(this, init);
    }
}
