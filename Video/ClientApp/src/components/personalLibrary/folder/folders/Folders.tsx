import * as React from 'react';
import {connect} from 'react-redux';
import 'assets/css/main.filemgr.css';
import * as FoldersThunk from "./Folders.thunk";
import * as FoldersReducer from "./Folders.reducer";
import {RouteComponentProps} from "react-router";
import FolderItem from "../FolderItem";
import FolderEditor from "../FolderEditor";
import {FolderVm} from "../../../../models/Folder";
import {ApplicationState} from "../../../../store";

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
        this.props.loadFolders(this.props.rootFolderId, false, true);
    }

    private onEdit(folder: FolderVm) {
        this.setState({showFolderModal: true, editItem: folder});
    }

    private onEditClose() {
        this.setState({showFolderModal: false, editItem: null});
    }

    private openFolder(id: number) {
        //this.props.clearFolders();
        this.props.loadFolders(id, false, false);
    }

    private archiveFolder(id: number) {
        this.props.archiveFolder(id);
    }

    public render() {
        const foldersList = this.props.folders.map((item) =>
            <div className="col-sm-6 col-lg-4 col-xl-3 py-md-1" key={item.id}>
                <FolderItem key={item.id} onArchive={() => this.archiveFolder(item.id)} onOpen={() => this.openFolder(item.id)} details={item} onEdit={() => this.onEdit(item)}/>
            </div>
        );
        const breadcrumbItems = this.props.openingsHistory.map((item, index) => {
            const classNames = "breadcrumb-item " + (index == this.props.openingsHistory.length - 1 ? "active" : "");
            return (<li key={item.id} onClick={() => this.openFolder(item.id)} className={classNames} aria-current="page">{item.name}</li>);
        });
        const currentFolderName = this.props.currentFolderId === this.props.rootFolderId ? 'Personal Library' : this.props.openingsHistory[this.props.openingsHistory.length - 1]?.name;
        return (
            <div>
                {this.props.openingsHistory && this.props.openingsHistory.length > 0 && <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-style2 mg-b-15">
                        <li className="breadcrumb-item">
                            <a onClick={() => this.openFolder(this.props.rootFolderId)}>Personal Library</a>
                        </li>
                        {breadcrumbItems}
                    </ol>
                </nav>}
                <h4 className="mg-b-10 mg-lg-b-15">{currentFolderName}</h4>
                <hr className="mg-y-10 bd-0"/>
                <label className="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mg-b-15">Folders</label>
                <div className="row row-xs">
                    <FolderEditor show={this.state.showFolderModal} folder={this.state.editItem} onClose={() => this.onEditClose()}/>
                    {foldersList}
                </div>
            </div>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.folders,
    FoldersThunk.actionCreators
)(Folders as any);
