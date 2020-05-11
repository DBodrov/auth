import { UserModel } from './user.model';
import { HttpException } from '../exceptions';
import { UserDb } from './types';

export class UserService {
    public async getUserByEmail(userEmail: string): Promise<UserDb> {
        const userDb = await UserModel.findOne({ email: userEmail });
        if (!userDb) {
            throw new HttpException(400, `User with email: ${userEmail} not found`);
        }
        return userDb;
    }

    public async getUserById(userId: string): Promise<UserDb> {
        const userDb = await UserModel.findById(userId);
        if (!userDb) {
            throw new HttpException(400, 'User not found');
        }
        return userDb;
    }
}
