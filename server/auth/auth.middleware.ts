import { Request } from 'express';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { UserModel, IUser } from '../models';

type User = {
    _id: Types.ObjectId;
} & IUser;

interface TokenData {
    token: string;
    expiresIn: number;
}

export class AuthMiddleWare {
    private user = UserModel;

    public async register(req: Request) {
        const userData: IUser = req['body'];
        const alreadyRegistered = this.user.findOne({ email: userData.email });
        if (alreadyRegistered) {
            throw new Error(`${userData.email} already used...`);
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.user.create({
            ...userData,
            password: hashedPassword,
        });
    }

    public createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;

        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}
