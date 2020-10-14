import React, { FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from "store";
import * as VideoWatch from '../VideoWatch.reducer';

type VideoStatProps = VideoWatch.VideoWatchState &  RouteComponentProps<{}>;

const VideoStat: FC<VideoStatProps> = (props) => {
    return (
        <div className="card card-body flex-row justify-content-between align-items-center bg-white py-2 mg-b-15">
            <h6 className="text-secondary mb-0">
                <i className="far fa-eye mr-1"></i>
                Video Views
            </h6>
            <div>
                <span>{props.video?.viewsCount} total</span>
                ,
                <span>{props.video?.uniqueViews} unique</span>
            </div>
        </div>
    );
};

export default connect(
    (state: ApplicationState) => state.videoWatch
)(VideoStat as any);