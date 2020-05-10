import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../user';
import { HttpException } from '../exceptions/HttpException';
import { JWT_SECRET } from '../util/secrets';

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    // console.log(request['cookies'], request['headers']);

    try {
        const token = request['headers']?.authorization;
        if (!token) {
            throw new HttpException(401, 'You are not authenticate');
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user: IUser = await UserModel.findOne({ _id: (decoded as any)._id });

        if (!user) {
            throw new HttpException(401, 'User not found');
        }
        const userData = {name: user.name, email: user.email}
        request['token'] = token;
        request['user'] = userData;
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
