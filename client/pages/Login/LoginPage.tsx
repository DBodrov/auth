import React from 'react';
import { Input, Button } from 'neutrino-ui';
import { Page, Form } from './styles';

export function LoginPage() {
    // const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeField = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'email') setEmail(value);
        if (event.target.name === 'password') setPassword(value);
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = { email, password };
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            // credentials: 'include'
        });
    };
    const handleGetMyProfile = (event: React.PointerEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // const formData = { email, password };
        fetch('/api/auth/users/me');
    };

    return (
        <Page>
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
                    autoComplete="off"
                />
                <Button type="submit" variant="primary" css={{ marginTop: 10 }}>
                    Sign In
                </Button>
                <Button type="button" onClick={handleGetMyProfile} variant="secondary" css={{ marginTop: 10 }}>
                    My Profile
                </Button>
            </Form>
        </Page>
    );
}
