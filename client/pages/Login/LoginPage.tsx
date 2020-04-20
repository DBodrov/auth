import React from 'react';
import {Input, Button} from 'neutrino-ui';
import { Page, Form } from './styles';

export function LoginPage() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeField = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'name') setName(value);
        if (event.target.name === 'email') setEmail(value);
        if (event.target.name === 'password') setPassword(value);
    };

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = { name, email, password };
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            // credentials: 'include'
        });
    };

    return (
        <Page>
            <Form onSubmit={handleRegister}>
                <Input type="text" name="name" onChangeHandler={handleChangeField} autoComplete="off" value={name}/>
                <Input type="email" name="email" onChangeHandler={handleChangeField} value={email} style={{margin: '1rem 0'}} />
                <Input type="password" name="password" onChangeHandler={handleChangeField} value={password} autoComplete="off" />
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>
        </Page>
    );
}
