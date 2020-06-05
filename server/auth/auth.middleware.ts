import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException';
import { JWT_SECRET } from '../util/secrets';

function checkAccessTokenExpiration(token: any) {
    console.log('=== decoded token ===', token);
    const tokenExp = new Date(token.exp);
    console.log('== token exp ===', tokenExp)
}

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request['headers']?.authorization;
        const refreshToken = request['cookies']?.Authorization;

        if (!token || !refreshToken) {
            throw new HttpException(401, 'You are not authenticate');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        checkAccessTokenExpiration(decoded);


        const userId: string = (decoded as any)._id;

        if (!userId) {
            throw new HttpException(401, 'User not found');
        }
        request['token'] = token;
        request['userId'] = userId;
        next();

    } catch (error) {
        let exception: any;
        if (error instanceof jwt.TokenExpiredError) {
            exception = new HttpException(403, error.message);
        } else {
            exception = error;
        }
        next(exception);
    }
}
