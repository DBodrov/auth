import React from 'react';
import { render } from 'react-dom';
import { Global } from '@emotion/core';
import { AppProviders } from './providers/AppProviders';
import { App } from './App';
import { globalStyles } from './styles';

render(
    <AppProviders>
        <Global styles={globalStyles} />
        <App />
    </AppProviders>,
    document.getElementById('root')
);
