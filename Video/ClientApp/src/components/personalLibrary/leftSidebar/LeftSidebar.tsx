import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faClock, faFolder, faShareAlt, faStar, faUserPlus, faVideo} from "@fortawesome/free-solid-svg-icons";
import FolderEditor from "../folder/FolderEditor";
import { actionCreators } from "./LeftSideBar.thunk";
import { connect } from "react-redux";
import { FoldersState } from "../folder/folders/Folders.reducer";
import { ApplicationState } from "store";

type OwnProps = { show: boolean };
type State = { showAddFolder: boolean, isPublicFolder: boolean };
type LeftSideBarProps =
    FoldersState &
    typeof actionCreators &
    OwnProps &
    State;

class LeftSidebar extends React.PureComponent<LeftSideBarProps> {
    constructor(props: LeftSideBarProps) {
        super(props);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    public state = {
        showAddFolder: false,
        isPublicFolder: false
    }

    public async onFileUpload(event: any) {
        const selectedFile = event.target.files[0];
        this.props.uploadVideo(this.props.currentFolderId, selectedFile);
        event.target.value = null;
    }

    public render() {
        if (this.props.show) {
            return (
                <div className="filemgr-sidebar">
                    <FolderEditor onClose={() => this.onFolderClose()} show={this.state.showAddFolder} isPublic={this.state.isPublicFolder}/>
                    <div className="filemgr-sidebar-header">
                        <span className="btn btn-xs btn-primary file-upload">
                            <input
                                type="file"
                                className="file-uploader"
                                accept="video/mp4,video/x-m4v,video/*"
                                onChange={this.onFileUpload}
                            />
                            <FontAwesomeIcon icon={faVideo} /> Upload
                        </span>
                        <div className="dropdown dropdown-icon flex-fill mg-l-10">
                            <button className="btn btn-xs btn-white" data-toggle="dropdown">Folder <FontAwesomeIcon icon={faChevronDown}/></button>
                            <div className="dropdown-menu tx-13">
                                <a onClick={() => this.createNewFolder(false)} className="dropdown-item"><FontAwesomeIcon icon={faFolder}/><span>New Folder</span></a>
                                <a onClick={() => this.createNewFolder(true)} className="dropdown-item"><FontAwesomeIcon icon={faFolder}/><span>New Public
                Folder</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="filemgr-sidebar-body">
                        <div className="pd-t-20 pd-b-10 pd-x-10">
                            <label className="tx-sans tx-uppercase tx-medium tx-10 tx-spacing-1 tx-color-03 pd-l-10">Personal Library</label>
                            <nav className="nav nav-sidebar tx-13">
                                <a className="nav-link active"><FontAwesomeIcon icon={faFolder}/> <span>All
                Files</span></a>
                                <a className="nav-link"><FontAwesomeIcon icon={faVideo}/> <span>My Videos</span></a>
                                <a className="nav-link"><FontAwesomeIcon icon={faShareAlt}/> <span>Shared
                Videos</span></a>
                                <a className="nav-link"><FontAwesomeIcon icon={faClock}/> <span>Recents</span></a>
                                <a className="nav-link"><FontAwesomeIcon icon={faStar}/> <span>Important</span></a>
                            </nav>
                        </div>
                    </div>
                </div>
            );
        }
        ;
    }

    private createNewFolder(isPublic: boolean) {
        this.setState({
            showAddFolder: true,
            isPublicFolder: isPublic
        });
    }

    private onFolderClose() {
        this.setState({
            showAddFolder: false
        });
    }
}

export default connect<any, any, OwnProps, any>(
    (state: ApplicationState) => state.folders,
    actionCreators
)(LeftSidebar as any);

