import React, { createContext, useContext, useLayoutEffect, useMemo } from 'react';
import { useAuthClient } from './use-authClient';
import { IAuthContext } from './types';

const AuthContext = createContext<IAuthContext>(undefined);

export function AuthProvider(props: any) {
    const {
        run,
        login,
        register,
        token,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        isUnAuthenticated,
    } = useAuthClient();

    useLayoutEffect(() => {
        if (!token) {
            run();
        }
    }, [run, token]);

    const value = useMemo(() => ({ token, login, register }), [login, register, token]);

    if (isIdle || isLoading) {
        return <span>Loading...</span>;
    }

    if (isSuccess || isUnAuthenticated) return <AuthContext.Provider value={value} {...props} />;

    if (isError) return <div>{error.message}</div>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
