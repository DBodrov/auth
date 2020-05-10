import { Request, Response, NextFunction } from 'express';
import { AuthService, UserData, LoginData } from './auth.service';
import {HttpException} from '../exceptions/HttpException';

export class AuthController {
    public register = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userData: UserData = request['body'];
            const { cookie, token } = await new AuthService().register(userData);

            response.setHeader('Set-Cookie', [cookie]);
            response.status(200).send({tokenData: token});
        } catch (error) {
            // console.log(error);
            next(error);
        }
    };

    public async signIn(request: Request, response: Response, next: NextFunction) {
        try {
            const loginData: LoginData = request['body'];
            const {cookie, accessToken} = await new AuthService().signIn(loginData);
            // console.log('cookie', cookie);
            response.setHeader('Set-Cookie', [cookie]);
            response.status(200).send({token: accessToken});
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    public getAccessToken = (request: Request, response: Response, next: NextFunction) => {
        try {
            const refreshToken = request['cookies']?.Authorization;
            if (!refreshToken) {
                throw new HttpException(401, 'Please authenticate');
            }
            const token = new AuthService().createAccessToken(refreshToken);
            response.status(200).send({token});
        } catch (error) {
            next(error);
        }

    }
}
