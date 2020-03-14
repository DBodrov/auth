import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {LoginPage} from './pages/Login';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <LoginPage />
            </Route>

        </Switch>
    )
}
