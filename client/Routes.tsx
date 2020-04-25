import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {RegisterPage} from './pages/Registration';
import {LoginPage} from './pages/Login';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <RegisterPage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>

        </Switch>
    )
}
