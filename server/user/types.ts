import { Document, Model } from 'mongoose';

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
}

export type UserDb = IUser & {profileId: string} & Document;

export interface IUserModel extends Model<UserDb> {}

// export interface IUserProfile extends IBaseUser {
//     role: string;
//     lastLogin: number;
// }
