import {Schema, model, Types} from 'mongoose';
import { IUserProfileModel } from './types';

export const UserProfileSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: Types.ObjectId,
        ref: 'Role'
    }
})

export const UserProfileModel: IUserProfileModel = model('UserProfile', UserProfileSchema);
