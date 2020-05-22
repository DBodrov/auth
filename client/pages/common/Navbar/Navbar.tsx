import React from 'react';
import styled from '@emotion/styled';
import { ITheme, Button } from 'neutrino-ui';
import { useProfile } from 'providers/User';
// import logo from '../../assets/neutrino-logo.png';

const StyledNav = styled.nav`
    display: grid;
    grid-template-columns: 1fr minmax(0, 250px);
    border-bottom: ${({ theme }: { theme: ITheme }) => `1px ${theme.colors.mainColors.primaryDark} solid`};
    background-color: ${({ theme }: { theme: ITheme }) => theme.colors.mainColors.primaryDark};
`;

const LinkButton = styled.button`
    display: inline;
    cursor: pointer;
    color: #fff;
    font-size: 1rem;
    text-decoration: underline;
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    background-color: transparent;
    margin-left: auto;

`;

export function Navbar() {
    const { name, getUserProfile } = useProfile();
    return (
        <StyledNav>
            <div>Page Name</div>
            <div css={{display: 'flex', paddingRight: '8px'}}>
                <LinkButton>Hello, {name}</LinkButton>
            </div>
        </StyledNav>
    );
}
