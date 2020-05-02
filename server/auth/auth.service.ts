import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models';
import {JWT_REFRESH_SECRET, JWT_SECRET} from '../util/secrets';
import { HttpException } from '../exceptions/HttpException';
import { decodeToken } from './auth.utils';

interface TokenData {
    token: string;
    expiresIn: number;
}

export type UserData = Pick<IUser, 'name' | 'email' | 'password'>;
export type LoginData = Omit<UserData, 'name'>;

export class AuthService {
    public async register(userData: UserData) {
        const currentUser = await UserModel.findOne({ email: userData.email });
        if (currentUser) {
            throw new HttpException(400, `${userData.email} already used...`, '/login');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await UserModel.create({
            ...userData,
            password: hashedPassword,
        });
        const newUser = { name: user.name, email: user.email };
        const token = this.createToken(user._id, 'access');
        const refreshToken = this.createToken(user._id, 'refresh');
        const cookie = this.createCookie(refreshToken);
        return {
            cookie,
            token,
            user: newUser,
        };
    }

    public async signIn(loginData: LoginData) {
        const user = await UserModel.findOne({ email: loginData.email });
        if (user) {
            const isSamePassword = await bcrypt.compare(loginData.password, user.get('password'));
            if (isSamePassword) {
                const token = this.createToken(user._id, 'access');
                const refreshToken = this.createToken(user._id, 'refresh');
                const cookie = this.createCookie(refreshToken);
                return {
                    cookie,
                    token,
                };
            } else {
                throw new HttpException(400, 'Invalid password');
            }
        } else {
            throw new HttpException(400, `User with email: ${loginData.email} not found`);
        }
    }

    public getAccessToken(refreshToken: string) {
        const decryptedValue = decodeToken(refreshToken);
        const accessTokenData = this.createToken((decryptedValue as any)._id, 'access');
        return accessTokenData;
    }

    private createToken(userId: IUser['_id'], tokenType: 'access' | 'refresh'): TokenData {
        const date = new Date();
        const expiresIn = tokenType === 'access' ? date.setMinutes(date.getMinutes() + 10) : date.setHours(date.getHours() + 1);
        const secret = tokenType === 'access' ? JWT_SECRET : JWT_REFRESH_SECRET;

        return {
            expiresIn,
            token: jwt.sign({ _id: userId }, secret, { expiresIn }),
        };
    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}
