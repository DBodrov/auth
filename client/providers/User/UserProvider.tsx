import React, { useContext, createContext, useMemo, useLayoutEffect } from 'react';
import { useProfileClient } from './use-profile-client';
import { UserProfileContext } from './types';

const UserContext = createContext<UserProfileContext>(undefined);

export function UserProvider({ children }) {
    const { user, profile, error, getCurrentUser, getUserProfile, isError, isIdle, isLoading, isSuccess } = useProfileClient();

    useLayoutEffect(() => {
        if (!user?.name) {
            getCurrentUser();
        }
    }, [user?.name, getCurrentUser]);

    const value = useMemo<UserProfileContext>(() => ({ user, profile, getCurrentUser, getUserProfile }), [getCurrentUser, getUserProfile, profile, user]);

    if (isIdle || isLoading) return <span>Loading profile...</span>;

    // if (isError) throw new Error(error.message);
    if (isError)
        return (
            <h3>
                Error: {error.status} - {error.message}
            </h3>
        );

    if (isSuccess) return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useProfile = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useProfile must be used within a UserProvider');
    }
    return context;
};
