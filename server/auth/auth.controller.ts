import { Request, Response, NextFunction } from 'express';
import { AuthService, UserData, LoginData } from './auth.service';

export class AuthController {
    public register = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userData: UserData = request['body'];
            const { user, cookie } = await new AuthService().register(userData);
            response.setHeader('Set-Cookie', [cookie]);
            response.status(200).send(user);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    public async signIn(request: Request, response: Response, next: NextFunction) {
        try {
            const loginData: LoginData = request['body'];
            const {cookie} = await new AuthService().signIn(loginData);
            console.log('cookie', cookie);
            response.setHeader('Set-Cookie', [cookie]);
            response.status(200).send('Hello!')
        } catch (error) {
            console.log(error);
            next(error);
        }

    }
}
