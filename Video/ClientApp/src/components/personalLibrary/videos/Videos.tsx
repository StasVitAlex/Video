import React, {FC, useEffect} from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from 'react-router';
import {ApplicationState} from "store";
import * as VideosReducer from "./Videos.reducer";
import * as FoldersReducer from "../folder/folders/Folders.reducer";
import * as VideosThunk from './Videos.thunk';

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
        if (this.props.currentFolderId) {
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
        console.log(this.props.videos)
        const videosList = this.props.videos.map((item) =>
            <div key={item.id} className="col-6 col-sm-4 col-lg-4 video-item">
                <div className="card card-file">
                    <div className="dropdown-file">
                        <a className="dropdown-link" data-toggle="dropdown"><i data-feather="more-vertical"></i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a href="#modalRename" data-toggle="modal" className="dropdown-item rename"><i data-feather="edit"></i>Rename</a>
                            <a href="#" className="dropdown-item archive"><i data-feather="archive"></i>Archive</a>

                        </div>
                    </div>
                    <div className="card-file-thumb card-img-thumb tx-primary">
                        <img src="../assets/img/demo.gif"/>
                    </div>
                    <div className="card-body">
                        <h6><a href="view.html" className="link-01">Sending Team Updates with Quick Videos</a></h6>
                        <ul className="list-inline d-flex mg-t-5 mg-b-0">
                            <li className="list-inline-item d-flex align-items-center">
                                <i className="far fa-clock tx-color-03 mg-r-5"></i>
                                <span className="tx-sans tx-uppercase tx-medium tx-color-03">1:38</span>
                            </li>
                            <li className="list-inline-item d-flex align-items-center mg-l-5">
                                <i className="far fa-eye tx-color-03 mg-r-5"></i>
                                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">269 views</span>
                            </li>
                            <li className="list-inline-item d-flex align-items-center mg-l-5">
                                <i className="far fa-calendar-day tx-color-03 mg-r-5"></i>
                                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">3 years ago</span>
                            </li>
                            <li className="list-inline-item d-flex align-items-center ml-auto">
                                <a className="link-02" id="info">
                                    <i className="far fa-info-circle tx-color-03 mg-r-5"></i>
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
