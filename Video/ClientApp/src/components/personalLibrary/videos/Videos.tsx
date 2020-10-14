import React, {FC, useEffect} from "react";
import {connect} from "react-redux";
import {faEllipsisV, faEdit, faArchive, faClock, faEye, faCalendarDay, faInfoCircle, faTimes, faSearch, faHamburger, faArrowLeft, faUserPlus, faVideo} from '@fortawesome/free-solid-svg-icons'
import {RouteComponentProps} from 'react-router';
import {ApplicationState} from "store";
import * as VideosReducer from "./Videos.reducer";
import * as FoldersReducer from "../folder/folders/Folders.reducer";
import * as VideosThunk from './Videos.thunk';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {history} from "../../../index";
import Moment from 'react-moment';
import {duration} from "moment";
import moVideoImage from 'assets/img/no-video.svg';
import VideoSidebarInfo from './videoSidebarInfo/VideoSidebarInfo';
import {Video} from "../../../models/Video";

type VideosProps = VideosReducer.VideosState & FoldersReducer.FoldersState & typeof VideosThunk.actionCreators & { isArchived: boolean } & RouteComponentProps<{}>;


class Videos extends React.PureComponent<VideosProps, { videoInfo: Video | undefined, showInfo: boolean, loadedFirstTime: boolean }> {

    constructor(props: VideosProps) {
        super(props);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    public state = {
        videoInfo: undefined,
        showInfo: false,
        loadedFirstTime: false
    };

    componentDidMount() {
        if (this.props.rootFolderId) {
            this.props.getVideosByFolder(this.props.rootFolderId, false);
            this.setState({loadedFirstTime: true});
            setTimeout(() => this.setState({loadedFirstTime: true}), 500);
        }
    }

    componentDidUpdate(prevProps: Readonly<VideosProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.currentFolderId != prevProps.currentFolderId) {
            this.props.getVideosByFolder(this.props.currentFolderId, false);
            if (!this.state.loadedFirstTime)
                setTimeout(() => this.setState({loadedFirstTime: true}), 500);
        }
    }

    private openVideo(linkCode: string) {
        history.push(`/video/${linkCode}`);
    }

    private openVideoInfo(video: Video) {
        this.setState({videoInfo: video, showInfo: true});
        this.props.getVideoActivities(video.id);
    }

    private archiveVideo(id: number) {
        this.props.archiveVideo(id);
    }

    public closeVideoInfo() {
        this.setState({showInfo: false});
    }


    public async onFileUpload(event: any) {
        const selectedFile = event.target.files[0];
        this.props.uploadVideo(this.props.currentFolderId, selectedFile);
        event.target.value = null;
    }

    public render() {
        const videosList = this.props.videos.map((item) => {
                const dur = duration(item.duration ? item.duration : 0, 'seconds');
                const hours = dur.hours();
                const minutes = dur.minutes();
                const seconds = dur.seconds();
                return (
                    <div key={item.id} className="col-6 col-sm-4 col-lg-4 video-item py-md-1">
                        <div className="card card-file">
                            <div className="dropdown-file">
                                <a className="dropdown-link" data-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisV}/></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item rename"><FontAwesomeIcon icon={faEdit}/> Rename</a>
                                    <a onClick={() => this.archiveVideo(item.id)} className="dropdown-item archive"><FontAwesomeIcon icon={faArchive}/> Archive</a>
                                </div>
                            </div>
                            <div className="card-file-thumb card-img-thumb tx-primary" onClick={() => this.openVideo(item.linkCode)}>
                                <img src={item.thumbnailUrl}/>
                            </div>
                            <div className="card-body">
                                <h6><a onClick={() => this.openVideo(item.linkCode)} className="link-01">{item.title}</a></h6>
                                <ul className="list-inline d-flex mg-t-5 mg-b-0">
                                    <li className="list-inline-item d-flex align-items-center">
                                        <FontAwesomeIcon icon={faClock} className="tx-color-03 mg-r-5"/>
                                        <span className="tx-sans tx-uppercase tx-medium tx-color-03">{hours}:{minutes}:{seconds}</span>
                                    </li>
                                    <li className="list-inline-item d-flex align-items-center mg-l-5">
                                        <FontAwesomeIcon icon={faEye} className="tx-color-03 mg-r-5"/>
                                        <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">{item.viewsCount} views</span>
                                    </li>
                                    <li className="list-inline-item d-flex align-items-center mg-l-5">
                                        <FontAwesomeIcon icon={faCalendarDay} className="tx-color-03 mg-r-5"/>
                                        <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03"><Moment fromNow>{item.createdDate}</Moment></span>
                                    </li>
                                    <li className="list-inline-item d-flex align-items-center ml-auto">
                                        <a className="link-02" id="info" onClick={() => this.openVideoInfo(item)}>
                                            <FontAwesomeIcon icon={faInfoCircle} className="tx-color-03 mg-r-5"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>);
            }
        );

        return (
            <div>
                <VideoSidebarInfo show={this.state.showInfo} activities={this.props.videoActivities} video={this.state.videoInfo} onClose={() => this.closeVideoInfo()}/>
                {(() => {
                    if (this.props.videos.length > 0) {
                        return (<div className="row row-xs">
                            {videosList}
                        </div>)
                    } else {
                        if (this.state.loadedFirstTime) {
                            return (<div className="d-flex flex-column align-items-center justify-content-center flex-1 my-5">
                                <img height="180" className="mg-b-20" src={moVideoImage}/>
                                <h3>You don’t have any videos 😭</h3>
                                <p className="mg-b-20">Not sure what to record? See how we use Link Video.</p>
                                <span className="btn btn-brand-02 btn-lg">
                            <input
                                type="file"
                                className="file-uploader"
                                accept="video/mp4,video/x-m4v,video/*"
                                onChange={this.onFileUpload}
                            /> Upload a Video
                        </span>

                            </div>)
                        }
                    }

                })()}
            </div>
        )
    }
};

export default connect(
    (state: ApplicationState) => {
        return {currentFolderId: state.folders?.currentFolderId, rootFolderId: state.folders?.rootFolderId, videos: state.videos?.videos, videoActivities: state.videos?.videoActivities}
    },
    VideosThunk.actionCreators
)(Videos as any);
