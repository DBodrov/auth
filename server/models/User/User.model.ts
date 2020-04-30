import { Document, Model, model, Schema } from 'mongoose';
// import {IUser} from './types';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}


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
});

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
