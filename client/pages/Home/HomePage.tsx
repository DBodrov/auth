import React, { useReducer, useCallback } from 'react';
import { Button } from 'neutrino-ui';
import { useAuth } from 'providers/Auth';
import { Page } from '../common';
import { SignInUpForm } from './SignInUpForm';

const initFormState = {
    isOpen: false,
    form: '',
};

export function HomePage() {
    const { login, register } = useAuth();
    const [state, setState] = useReducer((s: any, a: any) => ({ ...s, ...a }), initFormState);

    const handleRedirect = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name;
        setState({ isOpen: true, form: name });
    }, []);

    const handleDismissForm = useCallback(() => setState({ isOpen: false, form: '' }), []);
    const handleFetchUserData = useCallback((formData: any, formType: string) => {
        const fetcher = formType === 'login' ? login : register;
        fetcher(formData);
    }, [login, register]);

    return (
        <Page>
            <div
                css={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    width: '50%',
                    justifyContent: 'space-around',
                }}>
                <Button name="login" type="button" variant="primary" onClick={handleRedirect}>
                    Login
                </Button>
                <Button name="registration" variant="secondary" onClick={handleRedirect}>
                    Registration
                </Button>
            </div>
            <SignInUpForm
                formType={state.form}
                isOpen={state.isOpen}
                onDismiss={handleDismissForm}
                onSubmit={handleFetchUserData}
            />
        </Page>
    );
}
