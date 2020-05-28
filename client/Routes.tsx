import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Dashboard, ProfilePage} from './pages/App';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route path="/profile">
                <ProfilePage />
            </Route>
        </Switch>
    )
}
