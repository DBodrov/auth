import {HttpException} from '../exceptions';
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

    public async createProfile(userId: string) {
        const defaultRole = await this.#roleDb.findOne({role: 'user'});
        const profile = await this.#profileDb.create({
            userId,
            roleId: defaultRole._id
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
