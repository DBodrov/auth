import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {LoginPage, RegisterPage, HomePage} from './pages';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/registration">
                <RegisterPage />
            </Route>

        </Switch>
    )
}
