import { BaseOutputModel } from '../base-output.model';
import { OrderStatusModel } from './order-status.model';

export class OrderStatusOutputModel extends BaseOutputModel {
    order: OrderStatusModel;

    public constructor(init?: Partial<OrderStatusOutputModel>) {
        super(init);
    }
}