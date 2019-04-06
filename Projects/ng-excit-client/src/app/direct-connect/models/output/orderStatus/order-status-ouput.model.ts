import { BaseOutputModel } from '../base-output.model';
import { OrderStatusModel } from './order-status.model';

export class OrderStatusOutputModel extends BaseOutputModel {
    quantities: OrderStatusModel[];

    public constructor(init?: Partial<OrderStatusOutputModel>) {
        super(init);
        if (!this.quantities) {
            this.quantities = [];
        }
    }
}