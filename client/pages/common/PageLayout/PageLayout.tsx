import React from 'react';
import styled from '@emotion/styled';
import {Navbar} from '../Navbar';

const Layout = styled.div`
    display: grid;
    grid-template-rows: 80px 1fr;
    width: 100%;
    height: 100%;
`;



export function PageLayout(props: any) {
    return (
        <Layout>
            <Navbar />
            {props.children}
        </Layout>
    )
}
