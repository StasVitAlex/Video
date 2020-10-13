import * as React from 'react';
import {connect} from 'react-redux';
import 'assets/css/main.filemgr.css';
import {ApplicationState} from "../../store";
import {RouteComponentProps} from "react-router";
import LeftSidebar from "./leftSidebar/LeftSidebar";
import Folders from "./folder/folders/Folders";
import Videos from "./videos/Videos";

type PersonalLibraryProps = RouteComponentProps<{}>;

class PersonalLibrary extends React.PureComponent<PersonalLibraryProps, {}> {

    public state = {
        showFolderModal: false
    };

    componentDidMount() {

    }

    public render() {
        return (
            <div className="filemgr-wrapper">
                <LeftSidebar show={true}/>
                <div className="filemgr-content">
                    <div className="filemgr-content-body">
                        <div className="pd-20 pd-lg-25 pd-xl-30 flex-1">
                            <Folders />
                            <hr className="mg-y-40 bd-0"/>
                            <label className="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mg-b-15">Recent
                                Videos</label>
                            <Videos />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.folders
)(PersonalLibrary as any);
