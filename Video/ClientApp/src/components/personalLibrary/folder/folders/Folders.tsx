import * as React from 'react';
import {connect} from 'react-redux';
import 'assets/css/main.filemgr.css';
import * as FoldersThunk from "./Folders.thunk";
import * as FoldersReducer from "./Folders.reducer";
import {RouteComponentProps} from "react-router";
import FolderItem from "../FolderItem";
import {ApplicationState} from "store";
import FolderEditor from "../FolderEditor";
import {FolderVm} from "models/Folder";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

type FoldersProps =
    FoldersReducer.FoldersState &
    typeof FoldersThunk.actionCreators &
    { isArchived: boolean } &
    RouteComponentProps<{}>;

class Folders extends React.PureComponent<FoldersProps, { showFolderModal: boolean, editItem: FolderVm | null }> {

    public state = {
        showFolderModal: false,
        editItem: null
    };

    componentDidMount() {
        this.props.loadFolders(this.props.rootFolderId, false);
    }

    private onEdit(folder: FolderVm) {
        this.setState({showFolderModal: true, editItem: folder});
    }

    private onEditClose() {
        this.setState({showFolderModal: false, editItem: null});
    }

    public render() {
        const foldersList = this.props.folders.map((item) =>
            <div className="col-sm-6 col-lg-4 col-xl-3 py-md-1" key={item.id}>
                <FolderItem details={item} onEdit={() => this.onEdit(item)}/>
            </div>
        );
        return (
            <div className="row row-xs">
                <FolderEditor show={this.state.showFolderModal} folder={this.state.editItem} onClose={() => this.onEditClose()}/>
                {foldersList}
            </div>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.folders,
    FoldersThunk.actionCreators
)(Folders as any);
