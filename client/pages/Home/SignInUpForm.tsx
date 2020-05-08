import React, { useReducer } from 'react';
import { Modal, Input, Button } from 'neutrino-ui';
import { Form } from '../common';

interface ISignInUpFormProps {
    isOpen: boolean;
    formType: 'login' | 'registration';
    onSubmit: (formData: any, formType: ISignInUpFormProps['formType']) => void;
    onDismiss: () => void;
}

const initFormState = {
    name: '',
    email: '',
    password: '',
};

type FormState = typeof initFormState;

export function SignInUpForm({ isOpen, onDismiss, onSubmit, formType }: ISignInUpFormProps) {
    const [{ email, name, password }, dispatch] = useReducer(
        (s: FormState, a: any) => ({ ...s, ...a }),
        initFormState
    );

    const handleChangeField = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        dispatch({ [fieldName]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = { name, email, password };
        onSubmit(formData, formType);
    };
    const handleDismissForm = () => onDismiss();
    return (
        <Modal showClose escClose isOpen={isOpen} onClose={handleDismissForm}>
            <Form onSubmit={handleSubmit}>
                {formType === 'registration' && (
                    <Input
                        type="text"
                        name="name"
                        onChangeHandler={handleChangeField}
                        value={name}
                        style={{ margin: '1rem 0' }}
                        autoComplete="username"
                    />
                )}
                <Input
                    type="email"
                    name="email"
                    onChangeHandler={handleChangeField}
                    value={email}
                    style={{ margin: '1rem 0' }}
                    autoComplete="email"
                />
                <Input
                    type="password"
                    name="password"
                    onChangeHandler={handleChangeField}
                    value={password}
                    autoComplete={formType === 'login' ? 'current-password' : 'new-password'}
                />
                <Button type="submit" variant="primary" css={{ marginTop: 10 }}>
                    Sign In
                </Button>
            </Form>
        </Modal>
    );
}
