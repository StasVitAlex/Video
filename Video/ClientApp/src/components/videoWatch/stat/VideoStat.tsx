import React, { FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';

type VideoStatProps = RouteComponentProps<{}>;

const VideoStat: FC<VideoStatProps> = (props) => {
    return (
        <div className="card card-body flex-row justify-content-between align-items-center bg-white py-2 mg-b-15">
            <h6 className="text-secondary mb-0">
                <i className="far fa-eye mr-1"></i>
                Video Views
            </h6>
            <div>
                <span>0 total</span>
                ,
                <span>0 unique</span>
            </div>
        </div>
    );
};

export default connect(

)(VideoStat as any);