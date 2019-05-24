export class PlayViewModel {
    option: boolean;
    form: PlayFormViewModel;

    constructor(init?: Partial<PlayViewModel>) {
        Object.assign(this, init);
    }
}

export class PlayFormViewModel {
    first: string;
    second: string;

    constructor(init?: Partial<PlayFormViewModel>) {
        Object.assign(this, init);
    }
}
