import React, { createContext, useContext, useLayoutEffect, useMemo } from 'react';
import { useAuthClient } from './use-authClient';
import { TokenData, IAuthContext } from './types';

const AuthContext = createContext<IAuthContext>(undefined);

export function AuthProvider(props: any) {
    const {
        run,
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        isUnAuthenticated,
        tokenIsValid,
    } = useAuthClient();

    const tokenData: TokenData = data?.token;

    useLayoutEffect(() => {
        if (!tokenData) {
            run();
        }
    }, [run, tokenData]);

    const value = useMemo(() => ({ ...data, tokenIsValid }), [data, tokenIsValid]);

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
