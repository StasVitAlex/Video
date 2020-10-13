import React, {FC, useEffect} from "react";
import {connect} from "react-redux";
import {faEllipsisV, faEdit, faArchive, faClock, faEye, faCalendarDay, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {RouteComponentProps} from 'react-router';
import {ApplicationState} from "store";
import * as VideosReducer from "./Videos.reducer";
import * as FoldersReducer from "../folder/folders/Folders.reducer";
import * as VideosThunk from './Videos.thunk';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type VideosProps = VideosReducer.VideosState & FoldersReducer.FoldersState & typeof VideosThunk.actionCreators & { isArchived: boolean } & RouteComponentProps<{}>;


class Videos extends React.PureComponent<VideosProps, { loaded: boolean }> {

    public state = {
        loaded: false
    };

    componentDidMount() {
        if (this.props.rootFolderId) {
            this.props.getVideosByFolder(this.props.rootFolderId);
        }
    }

    componentDidUpdate(prevProps: Readonly<VideosProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.currentFolderId != prevProps.currentFolderId) {
            this.props.getVideosByFolder(this.props.currentFolderId);
        }
    }

    private openVideo(id: number) {
        //this.props.clearFolders();
        //this.props.loadFolders(id, false, false);
    }

    private archiveVideo(id: number) {
    }

    public render() {
        const videosList = this.props.videos.map((item) =>
            <div key={item.id} className="col-6 col-sm-4 col-lg-4 video-item py-md-1">
                <div className="card card-file">
                    <div className="dropdown-file">
                        <a className="dropdown-link" data-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisV}/></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a href="#modalRename" data-toggle="modal" className="dropdown-item rename"><FontAwesomeIcon icon={faEdit}/> Rename</a>
                            <a href="#" className="dropdown-item archive"><FontAwesomeIcon icon={faArchive}/> Archive</a>

                        </div>
                    </div>
                    <div className="card-file-thumb card-img-thumb tx-primary">
                        <img src={item.thumbnailUrl}/>
                    </div>
                    <div className="card-body">
                        <h6><a href="view.html" className="link-01">{item.title}</a></h6>
                        <ul className="list-inline d-flex mg-t-5 mg-b-0">
                            <li className="list-inline-item d-flex align-items-center">
                                <FontAwesomeIcon icon={faClock} className="tx-color-03 mg-r-5"/>
                                <span className="tx-sans tx-uppercase tx-medium tx-color-03">1:38</span>
                            </li>
                            <li className="list-inline-item d-flex align-items-center mg-l-5">
                                <FontAwesomeIcon icon={faEye} className="tx-color-03 mg-r-5"/>
                                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">{item.viewsCount} views</span>
                            </li>
                            <li className="list-inline-item d-flex align-items-center mg-l-5">
                                <FontAwesomeIcon icon={faCalendarDay} className="tx-color-03 mg-r-5"/>
                                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">3 years ago</span>
                            </li>
                            <li className="list-inline-item d-flex align-items-center ml-auto">
                                <a className="link-02" id="info">
                                    <FontAwesomeIcon icon={faInfoCircle} className="tx-color-03 mg-r-5"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="row row-xs">
                {videosList}
            </div>
        );
    }
};

export default connect(
    (state: ApplicationState) => {
        return {currentFolderId: state.folders?.currentFolderId, rootFolderId: state.folders?.rootFolderId, videos: state.videos?.videos}
    },
    VideosThunk.actionCreators
)(Videos as any);
