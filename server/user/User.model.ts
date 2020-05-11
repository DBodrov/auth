import { model, Schema } from 'mongoose';
import {IUser, IUserModel} from './types';

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
    // roleId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Role',
    // },
    // lastLogin: {
    //     type: Number,
    //     default: Date.now()
    // }

});

UserSchema.index({email: 1});
UserSchema.index({name: 1});

// UserSchema.loadClass(User);

export const UserModel: IUserModel = model('User', UserSchema);
