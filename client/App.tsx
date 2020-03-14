import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/core';
// import { Navbar } from './Navbar';
// import { Sidebar } from './Sidebar';
// import { Viewarea } from './Viewarea';
import { Main, globalStyles } from './styles';
import {Routes} from './Routes';
// import { DataProvider } from './providers/DataProvider';

// const componentsList = [
//     { name: 'Button', link: '/button' },
//     { name: 'Checkbox', link: '/checkbox' },
//     { name: 'Typography', link: '/typography' },
//     { name: 'Input', link: '/input' },
//     { name: 'MaskInput', link: '/maskinput' },
// ];

export function App() {
    return (
        <BrowserRouter>
            <Global styles={globalStyles} />

            <Routes />
        </BrowserRouter>
    );
}
