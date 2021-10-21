import React from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    /* using rest operator we get a variable which contains everything we did not cover by destructuring */
    ...rest
}) => (
    <Route {...rest} component={props => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            /* when user is authenticated we redirect it to another component using react-dom component "Redirect"*/
            <Redirect to="/" />
        )
    )}/>
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
