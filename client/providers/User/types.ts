import { IHttpException } from '../../common.types';
export type UserProfile = {
    name: string;
    email: string;
};

export type UserProfileContext = {
    getUserProfile: () => void;
} & UserProfile;

export type UserProfileState = {
    status: 'idle' | 'pending' | 'resolved' | 'rejected';
    data?: UserProfile;
    error?: IHttpException;
};
