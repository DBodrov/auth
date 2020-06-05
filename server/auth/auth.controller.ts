import { Request, Response, NextFunction } from 'express';
import { AuthService, UserData, LoginData } from './auth.service';
import { HttpException } from '../exceptions/HttpException';

export class AuthController {
    public register = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userData: UserData = request['body'];
            const { cookie, accessTokenData } = await new AuthService().register(userData);

            response.setHeader('Set-Cookie', [cookie]);
            response.status(200).send({ ...accessTokenData });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    };

    public async signIn(request: Request, response: Response, next: NextFunction) {
        try {
            const loginData: LoginData = request['body'];
            const { cookie, accessTokenData } = await new AuthService().signIn(loginData);
            // console.log('cookie', cookie);
            //TODO: loggerService.login(loginData);
            response.setHeader('Set-Cookie', [cookie]);
            response.status(200).send({ ...accessTokenData });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    public getAccessToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const refreshToken = request['cookies']?.Authorization;
            if (!refreshToken) {
                throw new HttpException(401, 'Please authenticate');
            }
            const { accessTokenData, cookie } = await new AuthService().createTokensData(refreshToken);
            response.setHeader('Set-Cookie', [cookie]);
            response.status(200).send({ ...accessTokenData });
        } catch (error) {
            next(error);
        }
    };

    public clearRefreshToken = (request: Request, response: Response, next: NextFunction) => {
        try {
            const refreshToken = request['cookies']?.Authorization;
            const authCookie = `Authorization=${refreshToken}; HttpOnly; Path=/; Max-Age=0`;
            response.setHeader('Set-Cookie', [authCookie]);
            response.status(200).send({ token: null, expiresIn: null });
        } catch (error) {
            next(error);
        }
    };
}
