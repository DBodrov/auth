import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { baseTheme } from 'neutrino-ui';
import {AuthProvider} from './Auth';

export function AppProviders({children}: {children: React.ReactNode}) {
    return (
        <BrowserRouter>
            <ThemeProvider theme={baseTheme}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}
