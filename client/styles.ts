import styled from '@emotion/styled'
import { css } from '@emotion/core'

export const Main = styled.main`
    display: grid;
    grid-template-columns: minmax(0, 250px) 1fr;
    grid-gap: 8px;
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
`;

export const globalStyles = css({
    'html, body': {
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
    },
    '*': { boxSizing: 'border-box' },
    '#root': { width: '100%', height: '100%' },
});
