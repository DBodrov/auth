import { Document, Model, model, Schema } from 'mongoose';

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

UserSchema.index({email: 1});
UserSchema.index({name: 1});

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
