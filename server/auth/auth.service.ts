import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models';
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
        const token = this.createToken(user);
        const refreshToken = this.createRefreshToken(user);
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
                const token = this.createToken(user);
                const refreshToken = this.createRefreshToken(user);
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
        const accessTokenData = this.createToken((decryptedValue as any)._id);
        return accessTokenData;
    }

    private createRefreshToken(userId: IUser['_id']): TokenData {
        const expiresIn = 3600; // an hour
        const secret = process.env.JWT_REFRESH_SECRET;

        return {
            expiresIn,
            token: jwt.sign({ _id: userId }, secret, { expiresIn }),
        };
    }

    private createToken(userId: IUser['_id']): TokenData {
        const expiresIn = 600; // 10 min
        const secret = process.env.JWT_SECRET;

        return {
            expiresIn,
            token: jwt.sign({ _id: userId }, secret, { expiresIn }),
        };
    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}
