import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder, faEllipsisV, faEdit, faArchive} from "@fortawesome/free-solid-svg-icons";
import {FolderVm} from "../../models/Folder";

export default class FolderItem extends React.PureComponent<{ details: FolderVm, onEdit: Function, onOpen: Function, onArchive: Function }, {}> {
    public state = {};

    public render() {
        return (
            <div className="media media-folder">
                <FontAwesomeIcon onClick={this.openFolder} icon={faFolder}/>
                <div className="media-body" onClick={this.openFolder}>
                    <h6><a className="link-02">{this.props.details.name}</a></h6>
                    <span>{this.props.details.filesCount} files</span>
                </div>
                <div className="dropdown-file">
                    <a className="dropdown-link" data-toggle="dropdown"> <FontAwesomeIcon icon={faEllipsisV}/></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a onClick={this.rename} data-toggle="modal" className="dropdown-item rename"> <FontAwesomeIcon icon={faEdit}/>Rename</a>
                        <a onClick={this.archive} className="dropdown-item archive"> <FontAwesomeIcon icon={faArchive}/>Archive</a>
                    </div>
                </div>

            </div>
        );
    }

    private rename = () => {
        this.props.onEdit(this.props.details);
    }

    private openFolder = (e:any) => {
        console.log(e.currentTarget);
        this.props.onOpen(this.props.details);
    }
    private archive = () => {
        this.props.onArchive(this.props.details);
    }

}
