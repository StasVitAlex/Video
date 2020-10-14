import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import queryString from 'query-string';
import * as AuthThunk from '../Auth.thunk';

type ActivateUserProps = typeof AuthThunk.actionCreators & RouteComponentProps<{}>;

const ActivateUser: FC<ActivateUserProps> = (props) => {
    const { activateUser, history, location } = props;
    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        if (!queryParams.token) {
            history.push('/');
            return;
        }

        activateUser(queryParams.token as string);
    }, [activateUser, history, location]);

    return (
        <div>
            Registration is almost completed.
        </div>
    );
};

export default connect
(null, AuthThunk.actionCreators)
(ActivateUser as any);
