import { AccessType } from "models/Video";
import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from "store";
import Comments from "./comments/Comments";
import VideoEdit from "./edit/VideoEdit";
import VideoInfo from "./info/VideoInfo";
import CheckVideoPassword from "./password/CheckVideoPassword";
import Player from "./player/Player";
import VideoSharing from "./sharing/VideoSharing";
import VideoStat from "./stat/VideoStat";
import { useAccess } from "./useAccess";
import UserInfo from "./userInfo/UserInfo";
import * as VideoWatchStore from './VideoWatch.reducer';
import * as VideoWatchThunk from './VideoWatch.thunk';

type VideoWatchProps =
    VideoWatchStore.VideoWatchState &
    typeof VideoWatchThunk.actionCreators &
    RouteComponentProps<{}>;

const VideoWatch: FC<VideoWatchProps> = (props: VideoWatchProps) => {
    const { getVideo, match } = props;
    const hasAccessToComment = useAccess();
    useEffect(() => {
        const params = match.params as any;
        getVideo(params.link);
    }, [getVideo, match]);

    if (!props.video && !props.videoToCheckAccess) {
        return null;
    }
    return (
        <div className="content  content-fixed bg-light">
            <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                <div className="row justify-content-center">
                    {
                        props.checkVideoPassword ?
                            (
                                <CheckVideoPassword />
                            ) :
                            (
                                <>
                                    <div className="col-lg-8">
                                        <Player />
                                        <VideoInfo />
                                        <UserInfo />
                                        <VideoStat />
                                        {
                                            hasAccessToComment &&
                                            <Comments />
                                        }
                                    </div>
                                    <div className="col-lg-4">
                                        <VideoSharing />
                                        <VideoEdit />
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state: ApplicationState) => state.videoWatch,
    VideoWatchThunk.actionCreators

)(VideoWatch as any);