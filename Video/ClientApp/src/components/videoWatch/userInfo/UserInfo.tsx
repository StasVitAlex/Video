import React, { FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from "store";
import * as VideoWatch from '../VideoWatch.reducer';
import { getLocalTime } from "utils/utils";

type UserInfoProps = VideoWatch.VideoWatchState & RouteComponentProps<{}>;

const UserInfo: FC<UserInfoProps> = (props) => {
    return (
        <div className="media mg-b-20">
            <img src={props.video?.createdBy.imageThumbnailUrl} className="avatar avatar-xl rounded-circle align-self-center" alt="" />
            <div className="media-body align-self-center pd-l-15">
                <h6 className="mg-b-2">By <a href="" className="link-01">
                    {`${props.video?.createdBy?.lastName} ${props.video?.createdBy?.firstName}`}
                </a>
                </h6>
                <span className="tx-13 tx-color-03">{getLocalTime(new Date(props.video!.createdDate))}</span>
            </div>
        </div>
    );
};

export default connect(
    (state: ApplicationState) => state.videoWatch
)(UserInfo as any);