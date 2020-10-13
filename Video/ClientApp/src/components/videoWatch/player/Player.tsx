import React, { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import logo from 'assets/img/bg-img.jpg';
// import 'assets/plyr/plyr.css';
import Plyr from 'plyr';

type VideoPlayerProps = RouteComponentProps<{}>;

const Player: FC<VideoPlayerProps> = (props) => {
    useLayoutEffect(() => {
        const player = new Plyr('#player', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        });
    }, []);
    return (
        <div style={{ height: '420px' }} className="mg-b-15">
            <video className="w-100 mg-b-20" id="player" playsInline controls poster={logo}>
                <source src="https://localhost:5001/api/video/stream/RT810Cp2u8w6XjSU" type="video/webm" />
            </video>
        </div>
    );
};

export default connect(

)(Player as any);