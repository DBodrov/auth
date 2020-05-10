import { Document, Model, model, Schema } from 'mongoose';

export interface IRole extends Document {
    role: string;
    roleId: number;
    getDefaultRole: () => any;
}

const RoleSchema = new Schema({
    role: {
        type: String,
    },
    roleId: {
        type: Number,
    },
});

RoleSchema.methods.getDefaultRole = function () {
    return this.model('Role').where('role', 'user');
};

export const RoleModel: Model<IRole> = model<IRole>('Role', RoleSchema);
