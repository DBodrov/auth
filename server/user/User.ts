export class User {
    #name: string;
    #email: string;
    #encodedPassword: string;
    #lastLogin: Date;

    constructor(name: string, email: string, encodedPassword: string) {
        this.#name = name;
        this.#email = email;
        this.#encodedPassword = encodedPassword;
        this.#lastLogin = null;
    }

    public get name() {
        return this.#name;
    }
}
