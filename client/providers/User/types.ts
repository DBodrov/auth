import { IHttpException } from '../../common.types';

export interface IUser {
    id: string;
    name: string;
    email: string;
    profileId: string;
};

export interface IUserProfile {
    id: string;
    userId: string;
    role: string;
}

export type UserProfileContext = {
    getCurrentUser: () => void;
    getUserProfile: (profileId: string) => void;
    user?: IUser;
    profile?: IUserProfile;
}
//& IUser & IUserProfile;

export type UserProfileState = {
    status: 'idle' | 'pending' | 'resolved' | 'rejected';
    user?: IUser;
    profile?: IUserProfile;
    error?: IHttpException;
};
