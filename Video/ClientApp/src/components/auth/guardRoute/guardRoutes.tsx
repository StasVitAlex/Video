import React from 'react';
import { Route, Redirect } from "react-router-dom";

type GuardedRouteProps = {
    Component: React.ComponentClass<any>,
    auth: boolean,
    rest: any
}

const GuardRoute = ({ Component, auth, ...rest }: GuardedRouteProps) => (
    <Route {...rest} render={(props: any) => (
        auth === true
            ? (<Component {...props} />)
            : <Redirect to='/' />
    )} />
);

export default GuardRoute;