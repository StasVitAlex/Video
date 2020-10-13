import React, {FC, useEffect} from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from 'react-router';
import {Video} from "../../../../models/Video";
import Moment from "react-moment";
import {faVideo, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {duration} from "moment";

type VideoInfoProps = { show: boolean, video: Video, onClose: Function } & RouteComponentProps<{}>;

const VideoSidebarInfo: FC<VideoInfoProps> = (props) => {
    const hours = React.useRef(0);
    const minutes = React.useRef(0);
    const seconds = React.useRef(0);
    useEffect(() => {
        const dur = duration(props.video && props.video.duration ? props.video.duration : 0, 'seconds');
        // hours.current = dur.hours();
        // minutes.current = dur.minutes();
        // seconds.current = dur.seconds();
    }, [props.show, props.video]);


    return (
        <div className={`filemgr-body-side ${props.show ? " " : "d-none"}`}>
            <div className="filemgr-info-header mg-b-15">
                <h5 className="mb-0 d-flex align-items-center">
                    <FontAwesomeIcon icon={faVideo} className="mr-1"/> <span className="wd-200 text-truncate d-inline-block">{props.video?.title}</span></h5>
                <a onClick={() => props.onClose()} id="close-sidebar">
                    <FontAwesomeIcon icon={faTimes}/>
                </a>
            </div>
            <div id="folder-info" className="filemgr-info-body">
                <div className="mg-b-10">
                    <label className="d-block mg-b-0 text-muted">Creation Date</label>
                    <p><Moment format="DD/MM/YYYY">
                        {props.video?.createdDate}
                    </Moment></p>
                </div>
                <div className="mg-b-10">
                    <label className="d-block mg-b-0 text-muted">Duration</label>
                    {/*<p>{hours.current}:{minutes.current}:{seconds.current}</p>*/}
                </div>
                <div className="mg-b-10">
                    <label className="d-block mg-b-0 text-muted">Views</label>
                    <p>{props.video?.viewsCount}</p>
                </div>
                <div className="mg-b-10">
                    <label className="d-block mg-b-0 text-muted">Shared Link</label>
                    <p>2 Links</p>
                </div>
                <nav className="nav nav-with-icon tx-13 mg-b-10">
                    <a id="manage-access-open" href="javascript:void(0);" className="nav-link">
                        Manage Shared Links
                        <i className="far fa-chevron-right ml-1"></i>
                    </a>
                </nav>
                <div className="mg-b-10">
                    <label className="d-block text-muted">Activity</label>
                    <ul className="list-unstyled">
                        <li className="mg-b-10">
                            <div className="media">
                                <div className="avatar avatar-sm avatar-online"><img src="../assets/img/users/1.jpg"
                                                                                     className="rounded-circle" alt=""/>
                                </div>
                                <div className="media-body mg-l-15">
                                    <p className="tx-12 mg-b-0"><strong>Majid Benten</strong> has viewed your video</p>
                                    <span className="tx-12">Aug 15 12:32pm</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="folder-access" className="filemgr-info-body d-none">
                <div className="d-flex align-items-center justify-content-between mg-b-20">
                    <a id="manage-access-cancel" href="javascript:void(0);"
                       className="tx-13 tx-spacing-1 tx-semibold mg-b-0 d-flex align-items-center">
                        <i className="far fa-long-arrow-left mr-2"></i>Manage Shared Links</a>
                </div>
                <ul className="list-unstyled media-list mg-b-15">
                    <li className="media align-items-center mg-b-10">
                        <div className="media-body pd-l-15">
                            <p className="tx-medium mg-b-0 lh-1">
                                <a href="javascript:void(0);"
                                   className="link-01 wd-200 d-inline-block text-truncate">https://drive.google.com/drive/u/0/</a>
                            </p>
                            <span className="tx-12 tx-color-03">Generated on: 28/09/2020</span>
                        </div>
                        <div className="mg-l-auto d-flex align-self-center">
                            <div className="d-flex align-items-center tx-18 ">
                                <div className="dropdown">
                                    <a data-toggle="dropdown" href="" className="link-03 wd-20 d-inline-block text-center lh-0 mg-l-10"><i
                                        className="icon ion-md-more"></i></a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#"><i className="far fa-stop-circle mr-2"></i>Stop Sharing</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default React.memo(connect<VideoInfoProps, any, any>(
    null,
)(VideoSidebarInfo as any))