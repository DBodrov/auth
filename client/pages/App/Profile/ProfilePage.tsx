import React from 'react';
import { useProfile } from 'providers/User';

export function ProfilePage() {
    const {getUserProfile, profile, user} = useProfile();
    React.useLayoutEffect(() => {
        if (!profile) {
            getUserProfile(user.profileId);
        }
    }, []);
    return <div>Profile...</div>;
}
