import { Request, Response, NextFunction } from 'express';
import { AuthService, UserData } from './auth.service';

export class AuthController {
    public register = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userData: UserData = request['body'];
            const user = await new AuthService().register(userData);
            response.send(user);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
}
