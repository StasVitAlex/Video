import React, { FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import UserLogo from 'assets/img/users/1.jpg';

type UserInfoProps = RouteComponentProps<{}>;

const UserInfo: FC<UserInfoProps> = (props) => {
    return (
        <div className="media mg-b-20">
            <img src={UserLogo} className="avatar avatar-xl rounded-circle align-self-center" alt="" />
            <div className="media-body align-self-center pd-l-15">
                <h6 className="mg-b-2">By <a href="" className="link-01">Yasser Al Anzi</a></h6>
                <span className="tx-13 tx-color-03">Aug 12 10:40pm</span>
            </div>
        </div>
    );
};

export default connect(

)(UserInfo as any);