import React, { useContext, createContext, useMemo, useEffect } from 'react';
import {useAuth} from '../Auth';
import { useProfileClient } from './use-profile-client';
import { UserProfileContext } from './types';
import {useIdle} from './use-idle';

const UserContext = createContext<UserProfileContext>(undefined);

export function UserProvider({ children }) {
    const userIsIdle = useIdle();
    const {logout} = useAuth();
    const {
        user,
        profile,
        error,
        getCurrentUser,
        getUserProfile,
        isError,
        isLoading,
        isIdle,
        isSuccess,
    } = useProfileClient();

    useEffect(() => {
        if (!user?.name) {
            getCurrentUser();
        }
        if (userIsIdle) {
            logout();
        }

    }, [user?.name, getCurrentUser, userIsIdle, logout]);

    const value = useMemo<UserProfileContext>(() => ({ user, profile, getCurrentUser, getUserProfile }), [
        getCurrentUser,
        getUserProfile,
        profile,
        user,
    ]);

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
