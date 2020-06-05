import { model, Schema } from 'mongoose';
import {IUserModel} from './types';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
    },
});

UserSchema.index({email: 1});
UserSchema.index({name: 1});


export const UserModel: IUserModel = model('User', UserSchema);
