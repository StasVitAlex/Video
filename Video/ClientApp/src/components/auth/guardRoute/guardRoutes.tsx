import React, { FC } from 'react';
import { ConnectedComponent, useStore } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { ApplicationState } from 'store';

type GuardedRouteProps = {
    component: ConnectedComponent<any, any> | React.ComponentClass<any>,
    path: string,
    exact?: boolean
}

const GuardRoute: FC<GuardedRouteProps> = ({ component: Component, ...rest }) => {
    const store = useStore();
    const authState = (store.getState() as ApplicationState).auth;
    const auth: boolean = authState && authState.userInfo !== undefined ? true : false;
    return (
        <Route {...rest} render={(props: any) => (
            true === true
                ? (<Component {...props} />)
                : <Redirect to='/signIn' />
        )} />
    );
};

export default GuardRoute;