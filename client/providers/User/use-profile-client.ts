import { useCallback, useReducer } from 'react';
import { useAuth } from 'providers/Auth';
import { useFetch, USER_API } from 'utils';
import { IHttpException } from '../../common.types';
import { IUser, IUserProfile, UserProfileState } from './types';

const initState: UserProfileState = {
    status: 'idle',
    user: null,
    profile: null,
    error: null,
};

export function useProfileClient() {
    const fetchClient = useFetch();
    const { token, updateAccessToken } = useAuth();
    const [{ status, user, profile, error }, setState] = useReducer<
        React.Reducer<UserProfileState, UserProfileState>
    >((s, a) => ({ ...s, ...a }), initState);

    const errorHandler = useCallback(
        (error: IHttpException) => {
            console.log('user error', error);
            if (error.status === 403 && error.message === 'jwt expired') {
                updateAccessToken();
                return error;
            }
            setState({ status: 'rejected', error });
            return error;
        },
        [updateAccessToken]
    );

    const getCurrentUser = useCallback(() => {
        setState({ status: 'pending' });
        const headers = {
            Authorization: token ? token : undefined,
        };

        fetchClient(`${USER_API}/me`, { headers }).then(
            (data: any) => {
                console.log('user client ', data);
                const userData = { ...data, id: (data as any)._id };
                const { _id, ...user } = userData;
                setState({ status: 'resolved', user: { ...user } });
                return data;
            },
            (error: IHttpException) => errorHandler(error)
        );
    }, [errorHandler, fetchClient, token]);

    const getUserProfile = useCallback(
        (profileId: string) => {
            setState({ status: 'pending' });
            const headers = {
                Authorization: token ? token : undefined,
            };
            fetchClient(`${USER_API}/profile/${profileId}`, { headers }).then(
                (data: IUserProfile) => {
                    console.log('profile data', data);
                    setState({ status: 'resolved', profile: { ...data } });
                    return data;
                },
                (error: IHttpException) => errorHandler(error)
            );
        },
        [errorHandler, fetchClient, token]
    );

    return {
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isSuccess: status === 'resolved',
        isError: status === 'rejected',

        user,
        profile,
        error,
        getCurrentUser,
        getUserProfile,
    };
}
