import React, { FC, useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import logo from 'assets/img/bg-img.jpg';
import * as VideoWatch from '../VideoWatch.reducer';
import Plyr from 'plyr';
import { ApplicationState } from "store";

type VideoPlayerProps =
    VideoWatch.VideoWatchState &
    RouteComponentProps<{}>;

const Player: FC<VideoPlayerProps> = (props) => {
    const logged = useRef(false);

    useEffect(() => {
        const player = new Plyr('#player', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        });
        player.on("play", () => {
            if (!logged.current) {
                console.log('play');
                logged.current = true;
            };
        });
    }, []);

    return useMemo<any>(() => (
        <div style={{ height: '420px' }} className="mg-b-15">
            <video className="w-100 mg-b-20" id="player" playsInline controls poster={props.video?.thumbnailUrl}>
                <source src={props.video?.linkUrl} type={`video/${props.video?.extension.slice(1)}`} />
            </video>
        </div>
    ), [props.video?.extension, props.video?.linkUrl, props.video?.thumbnailUrl]);
};

export default connect(
    (state: ApplicationState) => state.videoWatch
)(Player as any);