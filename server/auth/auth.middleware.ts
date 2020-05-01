import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../models';
import { HttpException } from '../exceptions/HttpException';
import { JWT_SECRET } from '../util/secrets';

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log(request['cookies'], request['headers']);
    try {
        const token = request['cookies']?.Authorization;
        if (!token) {
            throw new HttpException(401, 'You are not authenticate');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);

        const user: IUser = await UserModel.findOne({ _id: (decoded as any)._id });

        if (!user) {
            throw new HttpException(401, 'User not found');
        }
        request['token'] = token;
        request['user'] = user;
        next();

    } catch (error) {
        next(error);
    }
}
