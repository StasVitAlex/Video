import React, { FC, useCallback } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import Comments from "./comments/Comments";
import VideoEdit from "./edit/VideoEdit";
import VideoInfo from "./info/VideoInfo";
import Player from "./player/Player";
import VideoSharing from "./sharing/VideoSharing";
import VideoStat from "./stat/VideoStat";
import UserInfo from "./userInfo/UserInfo";

type VideoWatchProps = RouteComponentProps<{}>;

const VideoWatch: FC<VideoWatchProps> = (props) => {
    return (
        <div className="content  content-fixed bg-light">
            <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <Player />
                        <VideoInfo />
                        <UserInfo />
                        <VideoStat />
                        <Comments />
                    </div>
                    <div className="col-lg-4">
                        <VideoSharing />
                        <VideoEdit />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(

)(VideoWatch as any);