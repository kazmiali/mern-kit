import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../layout/NotFound';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';

const Routes = () => {
    return (
        <div className='container'>
            <Alert />
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/dashboard' component={Dashboard} />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default Routes;
