import React from 'react';
import {Input, Button} from 'neutrino-ui';
import { Page, Form } from './styles';

export function LoginPage() {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeField = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'login') setUserName(value);
        if (event.target.name === 'password') setPassword(value);
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = { userName, password };
        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
    };

    return (
        <Page>
            <Form onSubmit={handleLogin}>
                <Input type="text" name="login" onChangeHandler={handleChangeField} autoComplete="off" />
                <Input type="password" name="password" onChangeHandler={handleChangeField} autoComplete="off" style={{margin: '1rem 0'}}/>
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>
        </Page>
    );
}
