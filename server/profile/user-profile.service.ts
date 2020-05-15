import {HttpException} from '../exceptions';
import {UserDb} from '../user';
import {UserProfileModel} from './profile.model';
import {RoleModel} from './role.model';
import {IUserProfileModel, IRoleModel} from './types';

export class UserProfileService {
    #profileDb: IUserProfileModel;
    #roleDb: IRoleModel;
    constructor() {
        this.#profileDb = UserProfileModel;
        this.#roleDb = RoleModel;
    }

    public async createProfile(user: UserDb) {
        const defaultRole = await this.#roleDb.findOne({role: 'user'});
        const profile = await this.#profileDb.create({
            user,
            role: defaultRole
        });
        return profile;
    }

    public async readProfileById(profileId: string) {
        const profile = await this.#profileDb.findById(profileId);
        if (!profile) throw new HttpException(404, 'UserProfile not found');
        const userProfile = profile.populate('user').populate('role');
        return userProfile;
    }
}
