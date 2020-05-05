import React, { useContext, createContext, useMemo, useLayoutEffect } from 'react';
import { useProfileClient } from './use-profile-client';
import {UserProfile} from './types';

const UserContext = createContext<UserProfile>(undefined);

export function UserProvider({ children }) {
    const { data, error, getUserProfile, isError, isIdle, isLoading, isSuccess } = useProfileClient();

    useLayoutEffect(() => {
        if (!data?.name) {
            getUserProfile();
        }
    }, [data, getUserProfile]);

    const value = useMemo(() => ({ ...data }), [data]);

    if (isIdle || isLoading) return <span>Loading profile...</span>;

    if (isError) return <span>{error.message}</span>;

    if (isSuccess) return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useProfile = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useProfile must be used within a UserProvider');
    }
    return context;
}
