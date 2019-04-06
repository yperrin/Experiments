import { BaseOutputModel } from '../base-output.model';

export class LoginOutputModel extends BaseOutputModel {
    public isValid: boolean;

    public constructor(init?: Partial<LoginOutputModel>) {
        super(init);
    }
}
