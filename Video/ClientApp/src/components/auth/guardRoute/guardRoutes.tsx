import React, { FC } from 'react';
import { ConnectedComponent } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { AuthHelper } from '../Auth.helper';

type GuardedRouteProps = {
    component: ConnectedComponent<any, any> | React.ComponentClass<any>,
    path: string,
    exact?: boolean
}

const GuardRoute: FC<GuardedRouteProps> = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props: any) => (
            AuthHelper.isAuthenticated === true
                ? (<Component {...props} />)
                : <Redirect to='/signIn' />
        )} />
    );
};

export default GuardRoute;