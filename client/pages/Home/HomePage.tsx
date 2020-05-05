import React, {useReducer} from 'react';
import {Button, Modal} from 'neutrino-ui';
import {Page} from '../common'
import {LoginForm} from './LoginForm';

const initFormState = {
    login: false,
    registration: false,
};

function RegistrationForm({isOpen, onDismiss}: {isOpen: boolean, onDismiss: (formName: string) => void}) {
    const handleDismissForm = () => {
        onDismiss('registration');
    }
    return <Modal showClose escClose isOpen={isOpen} onClose={handleDismissForm}>
        Registration Form
    </Modal>
}

export function HomePage() {
    const [state, setState] = useReducer((s: any, a: any) => ({...s, ...a}), initFormState)

    const handleRedirect = (e: React.PointerEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name;
        setState({[name]: true});
    }

    const handleDismissForm = (formName: string) => setState({[formName]: false});

    return (
        <Page>
            <div css={{display: 'flex', flexFlow: 'row nowrap', width: '50%', justifyContent: 'space-around'}}>
                <Button name="login" type="button" variant="primary" onClick={handleRedirect}>
                    Login
                </Button>
                <Button name="registration" variant="secondary" onClick={handleRedirect}>
                    Registration
                </Button>
            </div>
            <LoginForm isOpen={state.login} onDismiss={handleDismissForm} />
            <RegistrationForm isOpen={state.registration} onDismiss={handleDismissForm} />
        </Page>
    )
}
