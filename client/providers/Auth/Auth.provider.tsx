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

export function AuthProveder(props: any) {
    const { run, data, error, isError, isIdle, isLoading, isSuccess } = useAuth();

    const tokenData: TokenData = data?.token;

    useLayoutEffect(() => {
        if (!tokenData) {
            run();
        }
    }, [run, tokenData]);

    const value = useMemo(() => ({}), [])

    return <AuthContext.Provider value={value} {...props}/>;
}
