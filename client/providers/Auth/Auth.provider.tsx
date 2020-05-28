import React, { createContext, useContext, useLayoutEffect, useMemo, useCallback } from 'react';
import { useAuthClient } from './use-authClient';
import { IAuthContext } from './types';

const AuthContext = createContext<IAuthContext>(undefined);

export function AuthProvider(props: any) {
    const {
        run,
        login,
        register,
        token,
        expiresIn,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        isUnAuthenticated,
    } = useAuthClient();

    useLayoutEffect(() => {
        const startSilentRefresh = () => {

        }
        if (!token) {
            run();
        } else {
            const expiredDate = new Date(expiresIn).toLocaleString();
            console.log(expiredDate);
        }

    }, [run, token]);

    const updateAccessToken = useCallback(() => {
        run()
    }, [run])

    const value = useMemo(() => ({ token, login, register, updateAccessToken }), [login, register, token, updateAccessToken]);

    if (isIdle || isLoading) {
        return <span>Loading...</span>;
    }

    if (isSuccess  || isUnAuthenticated) return <AuthContext.Provider value={value} {...props} />;

    if (isError) return <div>{error.message}</div>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
