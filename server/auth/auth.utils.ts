import jwt from 'jsonwebtoken';
// import {IUser, UserModel} from '../models';
import { HttpException } from '../exceptions/HttpException';
import { JWT_REFRESH_SECRET } from '../util/secrets';

export function decodeToken(token: string) {
    console.log('token', token);

        // const token = request['cookies']?.Authorization;
        if (!token) {
            throw new HttpException(401, 'You are not authenticate');
        }
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
        console.log(decoded);
        return decoded;
}
