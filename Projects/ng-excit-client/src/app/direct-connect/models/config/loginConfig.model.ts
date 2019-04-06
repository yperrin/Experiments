export class LoginConfig {
    usernameRequired = false;
    passwordRequired = false;
    accountNumberRequired = false;

    public constructor(init?:

        Partial<LoginConfig>) {
        Object.assign(this, init);
    }
}
