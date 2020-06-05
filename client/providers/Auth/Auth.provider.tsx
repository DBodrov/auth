import React, { createContext, useContext, useEffect, useMemo, useCallback, useState } from 'react';
import { useAuthClient } from './use-authClient';
import { IAuthContext } from './types';

const AuthContext = createContext<IAuthContext>(undefined);
let timeOut: any;

export function AuthProvider(props: any) {
    // const [idleTime, setIdleTime] = useState(idleTimeLeft);

    const {
        run,
        silentRefreshToken,
        login,
        logout,
        register,
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        isUnAuthenticated,
    } = useAuthClient();

    useEffect(() => {
        const startSilentRefresh = (ms: number) => {
            window.clearTimeout(timeOut);
            timeOut = window.setTimeout(() => {
                silentRefreshToken();
            }, ms);
        };
        if (!data) {
            run();
        } else {
            const expiryDate = new Date(data?.expiresIn);
            const now = new Date().valueOf();
            const expiredDate = expiryDate.toLocaleString();
            const expiryMs = expiryDate.valueOf();
            console.log(expiredDate, expiryMs - now);
            const tokenTTL = expiryMs - now;
            startSilentRefresh(tokenTTL);
        }

        return () => {
            window.clearTimeout(timeOut);
        };
    }, [data, data?.expiresIn, run, silentRefreshToken]);

    const value = useMemo(() => ({ token: data?.token, login, logout, register }), [login, logout, register, data?.token]);

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
