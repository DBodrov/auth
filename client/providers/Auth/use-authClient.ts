import { useReducer, useCallback } from 'react';
import { useFetch } from 'utils';
import { LoginData, RegistrationData } from './types';

const AUTH_API = '/api/auth';

const initialState: AuthState = { status: 'idle', data: null, error: null };
type AuthState = {
    status: 'idle' | 'pending' | 'resolved' | 'rejected';
    data?: any;
    error?: any;
};

// const tokenValidation = (tokenData: TokenData): boolean => {
//     if (tokenData) {
//         const now = new Date();
//         const tokenExpires = tokenData.expiresIn;
//         console.log('Date now =', now, 'Token expiration = ', new Date(tokenExpires));
//         return now.valueOf() < tokenExpires;
//     }
//     return false;
// };

export function useAuthClient() {
    const fetchClient = useFetch();
    const [{ status, data, error }, dispatch] = useReducer(
        (s: AuthState, a: AuthState) => ({ ...s, ...a }),
        initialState
    );
    const run = useCallback(() => {
        dispatch({ status: 'pending' });
        fetchClient(`${AUTH_API}/token`).then(
            (data) => {
                dispatch({ status: 'resolved', data });
                console.log('fetch', data);
                return data;
            },
            (error) => {
                console.log(error);
                dispatch({ status: 'rejected', error });
                return error;
            }
        );
    }, [fetchClient]);

    const login = useCallback(
        (loginData: LoginData) => {
            dispatch({ status: 'pending' });
            fetchClient(`${AUTH_API}/login`, { body: loginData }).then(
                (data) => {
                    console.log('login success', data)
                    dispatch({ status: 'resolved', data });
                    return data;
                },
                (error) => {
                    dispatch({ status: 'rejected', error });
                    return error;
                }
            );
        },
        [fetchClient]
    );

    const register = useCallback(
        (registrationData: RegistrationData) => {
            dispatch({ status: 'pending' });
            fetchClient(`${AUTH_API}/register`, { body: registrationData }).then(
                (data) => {
                    console.log('registration success', data)
                    dispatch({ status: 'resolved', data });
                    return data;
                },
                (error) => {
                    dispatch({ status: 'rejected', error });
                    return error;
                }
            );
        },
        [fetchClient]
    );

    return {
        run,
        login,
        register,
        token: data?.token,
        expiresIn: data?.expiresIn,
        error,

        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isSuccess: status === 'resolved',
        isError: status === 'rejected',
        isUnAuthenticated: error?.status === 401,
    };
}
