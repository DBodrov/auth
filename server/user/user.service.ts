import { UserModel } from './user.model';
import { HttpException } from '../exceptions';
import {UserProfileService} from '../profile';
import { UserDb, IUser } from './types';

export class UserService {

    #profileService: UserProfileService;

    constructor() {
        // console.log('User service ctor invoke')
        this.#profileService = new UserProfileService();
    }

    public async emailIsExist(userEmail: string) {
        const userDb = await UserModel.findOne({email: userEmail});
        const email = userDb?.email;
        return Boolean(email);
    }

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

    public async createUser(userData: IUser) {
        const userDb = await UserModel.create(userData);
        const profile = await this.#profileService.createProfile(userDb);
        userDb.profileId = profile._id;
        await userDb.save();
        return userDb;
    }
}
