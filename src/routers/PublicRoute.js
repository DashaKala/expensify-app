import React from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={props => (
        isAuthenticated ? (
            /* when user is authenticated we redirect it to another component using react-dom component "Redirect"*/
            <Redirect to="/dashboard" />
        ) : (
        <Component {...props} />
        )
    )}/>
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
