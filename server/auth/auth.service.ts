import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../util/secrets';
import { HttpException } from '../exceptions/HttpException';
import { decodeToken } from './auth.utils';

interface TokenData {
    token: string;
    // expiresIn: number;
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

        const token = this.generateToken(user._id, 'access');
        const refreshToken = this.generateToken(user._id, 'refresh');
        const cookie = this.createCookie(refreshToken);
        return {
            cookie,
            token,
        };
    }

    public async signIn(loginData: LoginData) {
        const user = await UserModel.findOne({ email: loginData.email });
        if (user) {
            const isSamePassword = await bcrypt.compare(loginData.password, user.get('password'));
            if (isSamePassword) {
                const accessToken = this.generateToken(user._id, 'access');
                const refreshToken = this.generateToken(user._id, 'refresh');
                // console.log('refresh token', refreshToken);
                const cookie = this.createCookie(refreshToken);
                return {
                    cookie,
                    accessToken,
                };
            } else {
                throw new HttpException(400, 'Invalid password');
            }
        } else {
            throw new HttpException(400, `User with email: ${loginData.email} not found`);
        }
    }

    public createAccessToken(refreshToken: string) {
        const decryptedUser = decodeToken(refreshToken);
        const accessTokenData = this.generateToken((decryptedUser as any)._id, 'access');
        return accessTokenData;
    }

    private generateToken(userId: IUser['_id'], tokenType: 'access' | 'refresh'): string {
        // const date = new Date();
        const expiresIn = tokenType === 'access' ? '30s' : '60s';
        // const accessTokenExpiresIn = date.setSeconds(date.getSeconds() + 60);

        const secret = tokenType === 'access' ? JWT_SECRET : JWT_REFRESH_SECRET;

        return jwt.sign({ _id: userId }, secret, { expiresIn });
    }

    private createCookie(token: string) {
        return `Authorization=${token}; HttpOnly; Max-Age=60`;
    }
}
