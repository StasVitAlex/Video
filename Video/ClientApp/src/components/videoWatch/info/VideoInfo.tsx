import React, { FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';

type VideoInfoProps = RouteComponentProps<{}>;

const VideoInfo: FC<VideoInfoProps> = (props) => {
    return (
        <div className="d-flex align-items-center mg-b-30 ">
            <h1 className="tx-24 mg-b-0">Sending Team Updates with Quick Videos</h1>
            <div className="d-flex ml-auto">
                <button type="button" className="btn btn-outline-primary btn-icon flex-fill" data-toggle="tooltip"
                    data-placement="top" title="Download">
                    <i data-feather="download"></i>
                </button>
                <button type="button" id="duplicate" className="btn btn-outline-primary btn-icon flex-fill  mg-l-10"
                    data-toggle="tooltip" data-placement="top" title="Duplicate Video">
                    <i data-feather="copy"></i>
                </button>
                <button type="button" className="btn btn-outline-primary btn-icon flex-fill  mg-l-10" data-toggle="tooltip"
                    data-placement="top" title="Delete Video">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        </div>
    );
};

export default connect(

)(VideoInfo as any);