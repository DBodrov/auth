import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Dashboard} from './pages/App';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
        </Switch>
    )
}
