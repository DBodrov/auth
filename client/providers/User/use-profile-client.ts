import { useCallback, useReducer } from 'react';
import { useAuth } from 'providers/Auth';
import { useFetch, AUTH_API } from 'utils';
import { IHttpException } from '../../common.types';
import { UserProfile, UserProfileState } from './types';

const initState: UserProfileState = {
    status: 'idle',
    data: null,
    error: null,
};

export function useProfileClient() {
    const fetchClient = useFetch();
    const { tokenData } = useAuth();
    const [{ status, data, error }, setState] = useReducer<React.Reducer<UserProfileState, UserProfileState>>(
        (s, a) => ({ ...s, ...a }),
        initState
    );

    const getUserProfile = useCallback(() => {
        setState({ status: 'pending' });
        const headers = {
            Authorization: tokenData?.token ? tokenData.token : undefined,
        };

        fetchClient(`${AUTH_API}/users/me`, { headers }).then(
            (data: UserProfile) => {
                console.log('user profile client ', data);
                setState({ status: 'resolved', data });
                return data;
            },
            (error: IHttpException) => {
                console.log('user profile client error', error);
                setState({ status: 'rejected', error });
                return error;
            }
        );
    }, [fetchClient, tokenData]);

    return {
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isSuccess: status === 'resolved',
        isError: status === 'rejected',

        data,
        error,
        getUserProfile,
    };
}