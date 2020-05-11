import { Document, Model } from 'mongoose';
import { IUser, UserDb } from '../user';

export interface IUserProfile extends IUser {
    role: string;
}

export type UserProfileDb = {user: UserDb, role: IRole} & Document;
export interface IUserProfileModel extends Model<UserProfileDb> {}


export interface IRole extends Document {
    role: string;
    roleId: number;
}

export interface IRoleModel extends Model<IRole> {}
