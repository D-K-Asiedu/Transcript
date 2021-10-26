import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {login} = useContext(AuthContext)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            login ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;