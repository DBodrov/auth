import React from 'react';
import {UserProvider} from 'providers/User';
import { Routes } from './Routes';

export default function AthenticatedApp() {
    return (
        <UserProvider>
            <Routes />
        </UserProvider>
    )
}
