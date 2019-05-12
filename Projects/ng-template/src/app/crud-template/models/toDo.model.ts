export class ToDoModel {
    id: number;
    description: string;
    assignedTo: string;
    completetd: boolean;
    completionDate: boolean;

    constructor(init?: Partial<ToDoModel>) {
        Object.assign(this, init);
    }
}
