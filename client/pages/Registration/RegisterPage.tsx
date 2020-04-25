import React from 'react';
import {useHistory} from 'react-router-dom';
import { Input, Button } from 'neutrino-ui';
import { Page, Form } from './styles';

export function RegisterPage() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    const handleChangeField = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'name') setName(value);
        if (event.target.name === 'email') setEmail(value);
        if (event.target.name === 'password') setPassword(value);
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = { name, email, password };
        const fetchUser = () => fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            // credentials: 'include'
        });
        fetchUser().then(async response => {
            const data = await response.json();
            console.log(response);
            if (response.ok) {
                return data;
            } else {
                // TODO: ExceptionHandler
                const {messsage, redirectUrl} = data;
                history.push(redirectUrl);
            }
        })
    };

    return (
        <Page>
            <Form onSubmit={handleRegister}>
                <Input
                    type="text"
                    name="name"
                    onChangeHandler={handleChangeField}
                    autoComplete="off"
                    value={name}
                />
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
                <Button type="submit" variant="primary">
                    Sign Up
                </Button>
            </Form>
        </Page>
    );
}
