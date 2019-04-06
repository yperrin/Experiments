import { SupplierOrderModel } from './supplier-order.model';

export class OrderStatusModel {
    poNumber: string;
    order: SupplierOrderModel[];

    public constructor(init?: Partial<OrderStatusModel>) {
        Object.assign(this, init);
    }
}
