import React from 'react';
import {Modal, Input, Button} from 'neutrino-ui';
import {useAuth} from '../../providers/Auth';
import {Form} from '../common';

interface ILoginFormProps {
    isOpen: boolean;
    onDismiss: (formName: string) => void;
}

export function LoginForm({isOpen, onDismiss}: {isOpen: boolean, onDismiss: (formName: string) => void}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {login} = useAuth();

    const handleChangeField = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'email') setEmail(value);
        if (event.target.name === 'password') setPassword(value);
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = { email, password };
        login(formData);
    };
    const handleDismissForm = () => {
        onDismiss('login');
    }
    return <Modal showClose escClose isOpen={isOpen} onClose={handleDismissForm}>
        <Form onSubmit={handleLogin}>
                <Input
                    type="email"
                    name="email"
                    onChangeHandler={handleChangeField}
                    value={email}
                    style={{ margin: '1rem 0' }}
                />
                <Input
                    type="password"
                    name="password"
                    onChangeHandler={handleChangeField}
                    value={password}
                    autoComplete="current-password"
                />
                <Button type="submit" variant="primary" css={{ marginTop: 10 }}>
                    Sign In
                </Button>
            </Form>
    </Modal>
}
