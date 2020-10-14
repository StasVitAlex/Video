import React, { FC, useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import Plyr from 'plyr';
import { ApplicationState } from "store";
import * as VideoWatchThunk from '../VideoWatch.thunk';
import * as VideoWatch from '../VideoWatch.reducer';


type VideoPlayerProps =
    VideoWatch.VideoWatchState &
    typeof VideoWatchThunk.actionCreators &
    RouteComponentProps<{}>;

const Player: FC<VideoPlayerProps> = (props) => {
    const logged = useRef(false);

    useEffect(() => {
        const player = new Plyr('#player', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        });
        player.on("play", () => {
            if (!logged.current) {
                props.logVideoAction();
                logged.current = true;
            };
        });
    });

    return useMemo<any>(() => (
        <div style={{ height: '420px' }} className="mg-b-15">
            <video className="w-100 mg-b-20" id="player" playsInline controls poster={props.video?.thumbnailUrl}>
                <source src={`api/video/stream/${props.video?.linkCode}`} type={`video/${props.video?.extension.slice(1)}`} />
            </video>
        </div>
    ), [props.video?.extension, props.video?.linkUrl, props.video?.thumbnailUrl]);
};

export default connect(
    (state: ApplicationState) => state.videoWatch,
    VideoWatchThunk.actionCreators
)(Player as any);