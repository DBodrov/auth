import React from 'react';
import { Page, Form } from './styles';

export function LoginPage() {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
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
                <input type="text" name="login" onChange={handleChangeField} autoComplete="off" />
                <input type="password" name="password" onChange={handleChangeField} autoComplete="off" />
                <button css={{ width: '150px', height: '2rem', color: '#fff', backgroundColor: '#339900' }}>
                    Sign In
                </button>
            </Form>
        </Page>
    );
}
