import bcrypt from 'bcrypt';
import {Types} from 'mongoose';
import {UserModel, IUser} from '../models';

type User = {
    _id: Types.ObjectId
} & IUser;

interface TokenData {
    token: string;
    expiresIn: number;
  }

export type UserData = Pick<IUser, 'name' | 'email' | 'password'>;

export class AuthService {
    public async register(userData: UserData) {
        const currentUser = await UserModel.findOne({ email: userData.email });
        if (currentUser) {
          throw new Error(`${userData.email} already used...`);
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await UserModel.create({
          ...userData,
          password: hashedPassword,
        });
        const newUser = {name: user.name, email: user.email};
        // const tokenData = this.createToken(user);
        // const cookie = this.createCookie(tokenData);
        return {
          // cookie,
          newUser,
        };
      }

    //   public createToken(user: User): TokenData {
    //     const expiresIn = 60 * 60; // an hour
    //     const secret = process.env.JWT_SECRET;
    //     const dataStoredInToken: DataStoredInToken = {
    //       _id: user._id,
    //     };
    //     return {
    //       expiresIn,
    //       token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    //     };
    //   }
}
