import { Document, Model, model, Schema } from 'mongoose';
// import {User} from './User';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    lastLogin: number;
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
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
    lastLogin: {
        type: Number,
        default: Date.now()
    }

});

UserSchema.index({email: 1});
UserSchema.index({name: 1});

// UserSchema.loadClass(User);

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
