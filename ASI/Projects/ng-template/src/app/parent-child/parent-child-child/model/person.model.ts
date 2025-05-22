export class PersonModel {
    name: string;
    dateOfBirth: Date;
    numberOfChildren: number;

    public constructor(init?: Partial<PersonModel>) {
        Object.assign(this, init);
    }
}
