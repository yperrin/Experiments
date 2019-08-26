import { SupplierOrderModel } from './supplier-order.model';

export class OrderStatusModel {
    poNumber: string;
    statuses: SupplierOrderModel[];

    public constructor(init?: Partial<OrderStatusModel>) {
        Object.assign(this, init);
        if (!this.statuses) {
            this.statuses = [];
        }
    }
}
