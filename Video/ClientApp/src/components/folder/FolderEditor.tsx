import * as React from 'react';
import {FolderVm} from "../../models/Folder";
import Modal from "../modal/Modal";

export default class FolderEditor extends React.PureComponent<{ show: boolean, folder?: FolderVm, isPublic?: boolean, onFolderClose?: Function }, { showModal: boolean }> {
    public state = {
        showModal: true
    };

    public render() {
        const saveText = this.props.folder ? 'Rename' : 'Create';
        const title = this.props.folder ? 'Edit folder' : 'Create folder';
        return (
            <Modal
                show={this.props.show}
                onClose={this.onClose}
                saveText={saveText}
                title={title}
            >
                <p>test</p>
            </Modal>
        );
    }

    private onClose = (e: any) => {
        if (this.props.onFolderClose)
            this.props.onFolderClose(e);
    }

}
