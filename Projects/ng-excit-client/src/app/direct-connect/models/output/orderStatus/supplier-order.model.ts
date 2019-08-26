import { ShipmentModel } from './shipment.model';

export class SupplierOrderModel {
    identifier: string;
    status: string;
    statusDescription: string;
    expectedShipDate: Date;
    expectedDeliveryDate: Date;
    lastupdatedDate: Date;
    shipments: ShipmentModel[];

    public constructor(init?: Partial<SupplierOrderModel>) {
        Object.assign(this, init);
        if (!this.shipments) {
            this.shipments = [];
        }
    }
}
