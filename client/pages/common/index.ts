import styled from '@emotion/styled'

export const Page = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
    border-left: 1px ${({theme}: {theme: any}) => theme.colors.pageElementsColors.border} solid;
    border-right: 1px ${({theme}: {theme: any}) => theme.colors.pageElementsColors.border} solid;
`;

export const Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
    max-width: 320px;
    max-height: 450px;
    margin: auto;
    border: 1px #abb4bd solid;
    padding: 0 0.5rem;
`;
