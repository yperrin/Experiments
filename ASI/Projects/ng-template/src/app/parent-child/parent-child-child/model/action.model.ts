export class ActionModel {
    action: string;

    public constructor(init?: Partial<ActionModel>) {
        Object.assign(this, init);
    }
}
