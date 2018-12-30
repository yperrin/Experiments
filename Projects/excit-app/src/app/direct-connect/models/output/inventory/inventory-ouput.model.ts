import { BaseOutputModel } from '../base-output.model';
import { InventoryQuantityModel } from './inventory-quantity.model';

export class InventoryOutputModel extends BaseOutputModel {
    productIdentifier: string;
    productDescription: string;
    quantities: InventoryQuantityModel[];

    public constructor(init?:Partial<InventoryOutputModel>) {
        super(init);
        if (!this.quantities) this.quantities = []; 
    }    
}