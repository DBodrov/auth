import express, {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import { UserModel, IUser } from '../models';
export class RegisterController {
    public router = express.Router();
    public path = '/api';
    private user = UserModel;

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.handleRegister)
    }

    private handleRegister = async (req: Request, response: Response, next: NextFunction) => {
        const userData: IUser = req['body'];
        console.log('=====', userData, '****', UserModel, '*****', this);
        const hasUser = await this.user.findOne({email: userData.email});
        if (hasUser) {
            next({message: `${userData.email} already used...`});
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user: IUser = await this.user.create({
                ...userData,
                password: hashedPassword
            });
            response.send(user);
        }
    }
}
