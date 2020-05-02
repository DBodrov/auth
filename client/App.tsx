import React from 'react';
import { useAuth } from './providers/Auth';

const AuthenticatedApp = React.lazy(() => import(/* webpackPrefetch: true */ './AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnAuthenticatedApp'));

export function App() {
    const { tokenIsValid } = useAuth();

    return (
        <React.Suspense fallback={<h3>Loading lazy...</h3>}>
            {tokenIsValid ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
    );
}
