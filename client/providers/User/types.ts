import { IHttpException } from '../../common.types';
export type UserProfile = {
    name: string;
    email: string;
};

export type UserProfileState = {
    status: 'idle' | 'pending' | 'resolved' | 'rejected';
    data?: UserProfile;
    error?: IHttpException;
};
