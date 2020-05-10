import React from 'react';
import { useAuth } from './providers/Auth';

const AuthenticatedApp = React.lazy(() => import(/* webpackPrefetch: true */ './AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnAuthenticatedApp'));

export function App() {
    const { tokenIsValid, token } = useAuth();

    return (
        <React.Suspense fallback={<h3>Loading lazy...</h3>}>
            {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
    );
}
