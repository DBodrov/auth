import React from 'react';
import {Button} from 'neutrino-ui';
import { useProfile } from 'providers/User';


export function Dashboard() {
    const { email, name, getUserProfile } = useProfile();
    return (
        <div>
            <h1>Dashboard Page</h1>
            <h3>Hello, {name} !</h3>
            <Button variant="primary" onClick={getUserProfile}>Load Profile</Button>
        </div>
    );
}
