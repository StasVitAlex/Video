import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import queryString from 'query-string';
import * as AuthThunk from '../Auth.thunk';

type ActivateUserProps = typeof AuthThunk.actionCreators & RouteComponentProps<{}>;

const ActivateUser: FC<ActivateUserProps> = (props) => {
    useEffect(() => {
        const queryParams = queryString.parse(props.location.search);
        if (!queryParams.token) {
            props.history.push('/');
            return;
        }

        props.activateUser(queryParams.token as string);
    }, []);

    return (
        <div>
            Registration is almost completed.
        </div>
    );
};

export default connect
(null, AuthThunk.actionCreators)
(ActivateUser as any);
