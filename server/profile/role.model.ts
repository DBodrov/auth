import { model, Schema } from 'mongoose';
import {IRoleModel} from './types';

const RoleSchema = new Schema({
    role: {
        type: String,
    },
    roleId: {
        type: Number,
    },
});

export const RoleModel: IRoleModel = model('Role', RoleSchema);
