import { useReducer, useCallback } from 'react';
import { useFetch } from '../../utils/use-fetch';

const AUTH_API = '/api/auth';

const initialState: AuthState = { status: 'idle', data: null, error: null };
type AuthState = {
    status: 'idle' | 'pending' | 'resolved' | 'rejected';
    data?: any;
    error?: any;
};

export function useAuth() {
    const fetchClient = useFetch();
    const [{status, data, error}, dispatch] = useReducer((s: AuthState, a: AuthState) => ({ ...s, ...a }), initialState);
    const run = useCallback(() => {
        dispatch({ status: 'pending' });
        fetchClient(`${AUTH_API}/token`).then(
            (data) => {
                dispatch({ status: 'resolved', data });
                return data;
            },
            (error) => {
                dispatch({ status: 'rejected', error });
                return error;
            }
        );
    }, [fetchClient]);

    return {
        run,
        data,
        error,

        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isSuccess: status === 'resolved',
        isError: status === 'rejected'
    }
}
