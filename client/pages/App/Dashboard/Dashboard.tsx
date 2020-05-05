import React from 'react';
import { useProfile } from 'providers/User';

export function Dashboard() {
    const { email, name } = useProfile();
    return (
        <div>
            <h1>Dashboard Page</h1>
            <h3>Hello, {name} !</h3>
        </div>
    );
}
