import React from 'react';
import { Button } from 'neutrino-ui';
import { useProfile } from 'providers/User';
import { PageLayout } from 'pages/common';

export function Dashboard() {
    const { email, name, getUserProfile } = useProfile();
    return (
        <PageLayout>
            <div>
                <h1>Dashboard Page</h1>
                <h3>Hello, {name} !</h3>
                <Button variant="primary" onClick={getUserProfile}>
                    Load Profile
                </Button>
            </div>
        </PageLayout>
    );
}
