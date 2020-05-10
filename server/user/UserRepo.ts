import {IUser, UserModel} from './User.model';

export class User {
    #name: string;
    #email: string;
    #encodedPassword: string;
    #lastLogin: Date;
    db: typeof UserModel;

    constructor(name: string, email: string, encodedPassword: string) {
        this.#name = name;
        this.#email = email;
        this.#encodedPassword = encodedPassword;
        this.#lastLogin = null;
        this.db = UserModel;
    }

    public async create() {
        const currentUser = await this.findByEmail();
        // if (currentUser) {

        // }
    }

    public async findByEmail() {
        return await this.db.findOne({email: this.#email});
    }

    public get name() {
        return this.#name;
    }
}
