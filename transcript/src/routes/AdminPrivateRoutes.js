import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

const AdminPrivateRoute = ({component: Component, ...rest}) => {
    const {adminLogin} = useContext(AuthContext)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            adminLogin ?
                <Component {...props} />
            : <Redirect to="/admin" />
        )} />
    );
};

export default AdminPrivateRoute;