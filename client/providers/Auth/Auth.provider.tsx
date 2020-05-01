import React, { createContext, useContext, useLayoutEffect, useMemo } from 'react';
import { useAuth } from './use-auth';

type TokenData = {
    token: string;
    expiresIn: Date;
};

type UserData = {
    name: string;
    email: string;
};

interface IAuthContext {
    tokenData: TokenData;
    userData: UserData;
}

const AuthContext = createContext<IAuthContext>(undefined);

export function AuthProvider(props: any) {
    const { run, data, error, isError, isIdle, isLoading, isSuccess } = useAuth();

    const tokenData: TokenData = data?.token;

    useLayoutEffect(() => {
        if (!tokenData) {
            run();
        }
    }, [run, tokenData]);

    const value = useMemo(() => ({ ...data }), [data]);

    if (isIdle || isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) return <div role="alert">{error.message}</div>;

    return <AuthContext.Provider value={value} {...props} />;
}
