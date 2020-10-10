import * as React from 'react';
import {connect} from 'react-redux';
import 'assets/css/main.filemgr.css';
import {ApplicationState} from "../../store";
import * as PersonalLibraryThunk from "../personalLibrary/PersonalLibrary.thunk";
import * as PersonalLibrary from "../personalLibrary/PersonalLibrary.reducer";
import {RouteComponentProps} from "react-router";
import FolderItem from "../folder/FolderItem";
import LeftSidebar from "../leftSidebar/LeftSidebar";

type PersonalLibraryProps =
    PersonalLibrary.PersonalLibraryState &
    typeof PersonalLibraryThunk.actionCreators &
    RouteComponentProps<{}>;

class PersonalLibraryDashboard extends React.PureComponent<PersonalLibraryProps, {}> {

    componentDidMount() {
        this.props.getAllFolders();
    }

    public render() {
        const foldersList = this.props.folders.map((item) =>
            <div className="col-sm-6 col-lg-4 col-xl-3 folder-item" key={item.id}>
                <FolderItem details={item}/>
            </div>
        );
        return (
            <div className="filemgr-wrapper">
                <LeftSidebar show={true}/>
                <div className="filemgr-content">
                    <div className="filemgr-content-body">
                        <div className="pd-20 pd-lg-25 pd-xl-30 flex-1">
                            <h4 className="mg-b-10 mg-lg-b-15">Personal Library</h4>
                            <hr className="mg-y-10 bd-0"/>
                            <label className="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mg-b-15">Folders</label>
                            <div className="row row-xs">
                                {foldersList}
                            </div>

                            <hr className="mg-y-40 bd-0"/>
                            <label className="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mg-b-15">Recent
                                Videos</label>
                            <div className="row row-xs">
                                <div className="col-6 col-sm-4 col-lg-4 video-item">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.personalLibrary,
    PersonalLibraryThunk.actionCreators
)(PersonalLibraryDashboard as any);
