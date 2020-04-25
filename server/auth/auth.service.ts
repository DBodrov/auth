import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models';
import { HttpException } from '../exceptions/HttpException';

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
            throw new HttpException(400, `${userData.email} already used...`);
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await UserModel.create({
            ...userData,
            password: hashedPassword,
        });
        const newUser = { name: user.name, email: user.email };
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);
        return {
            cookie,
            user: newUser,
        };
    }

    public async signIn(loginData: LoginData) {
        const user = await UserModel.findOne({ email: loginData.email });
        if (user) {
            const isSamePassword = await bcrypt.compare(loginData.password, user.get('password'));
            if (isSamePassword) {
                const tokenData = this.createToken(user);
                const cookie = this.createCookie(tokenData);
                return {
                    cookie,
                };
            } else {
                throw new Error('Invalid password');
            }
        } else {
            throw new Error(`User with email: ${loginData.email} not found`);
        }
    }

    private createToken(user: IUser): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;

        return {
            expiresIn,
            token: jwt.sign({ _id: user._id }, secret, { expiresIn }),
        };
    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}
