import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, UserService } from '../user';
import { UserProfileService } from '../profile';
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
    #userService: UserService;
    #profileService: UserProfileService;

    constructor() {
        this.#userService = new UserService();
        this.#profileService = new UserProfileService();
    }
    public async register(userData: UserData) {
        const existedUser = await this.#userService.emailIsExist(userData.email);
        // const defaultRole = await RoleModel.findOne({ role: 'user' });
        if (existedUser) {
            throw new HttpException(400, `${userData.email} already used...`, '/login');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.#userService.createUser({
            ...userData,
            password: hashedPassword,
        });
        const accessToken = this.generateToken(user._id, 'access');
        const refreshToken = this.generateToken(user._id, 'refresh');
        const cookie = this.createCookie(refreshToken);
        return {
            cookie,
            accessToken,
        };
    }

    public async signIn(loginData: LoginData) {
        const userDb = await this.#userService.getUserByEmail(loginData.email);
        const userExist = Boolean(userDb?._id);
        if (userExist) {
            const isSamePassword = await bcrypt.compare(loginData.password, userDb.password);
            if (isSamePassword) {
                const accessToken = this.generateToken(userDb._id, 'access');
                const refreshToken = this.generateToken(userDb._id, 'refresh');
                const cookie = this.createCookie(refreshToken);
                // await UserModel.updateOne({ email: loginData.email }, { lastLogin: Date.now() });
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
        const expiresIn = tokenType === 'access' ? '600s' : '1h';
        // const accessTokenExpiresIn = date.setSeconds(date.getSeconds() + 60);

        const secret = tokenType === 'access' ? JWT_SECRET : JWT_REFRESH_SECRET;

        return jwt.sign({ _id: userId }, secret, { expiresIn });
    }

    private createCookie(token: string) {
        return `Authorization=${token}; HttpOnly; Max-Age=60`;
    }
}
