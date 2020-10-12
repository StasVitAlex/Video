import * as React from 'react';
import {FC, useCallback, useEffect, useState} from 'react';
import {CreateFolderVm, FolderType, FolderVm, UpdateFolderVm} from "models/Folder";
import Modal from "components/modal/Modal";
import classnames from "classnames";
import ValidationConstants from "constants/Validation.constants";
import {useForm} from "react-hook-form";
import * as FoldersThunk from "./folders/Folders.thunk";
import {RouteComponentProps} from "react-router";
import {connect, useSelector} from "react-redux";
import {ApplicationState} from "store";
import {FoldersState} from "./folders/Folders.reducer";
import { Form } from 'reactstrap';

type FolderEditorInternalProps = { show: boolean, folder?: FolderVm, isPublic?: boolean, onClose?: Function };

type FolderEditorProps =
    typeof FoldersThunk.actionCreators &
    FolderEditorInternalProps &
    RouteComponentProps<{}>;

const FolderEditor: FC<FolderEditorProps> = (props) => {
    const foldersState: FoldersState = useSelector<ApplicationState, any>((state) => state.folders);
    const {register, handleSubmit, errors, reset, setValue} = useForm<CreateFolderVm>();
    const isEdit = React.useRef(false);
    const form = React.useRef<any>(null);
    useEffect(() => {
        isEdit.current = !!props.folder;
    }, [props.folder, props.show]);

    const onSubmit = useCallback((data: CreateFolderVm) => {
        if (isEdit.current) {
            props.updateFolder(Object.assign(props.folder, {name: data.name}) as UpdateFolderVm);
        } else {
            data.parentFolderId = foldersState.currentFolderId;
            data.folderType = props.isPublic ? FolderType.Public : FolderType.Private;
            props.createFolder(data);
        }
        reset();
        if (props.onClose)
            props.onClose();

    }, [foldersState.currentFolderId, props, reset]);
    const saveText = isEdit.current ? 'Rename' : 'Create';
    const title = isEdit.current ? 'Edit folder' : 'Create folder';
    if (isEdit && props.folder) {
        setValue('name', props.folder.name);
    }
    return (
        <Modal
            show={props.show}
            onClose={(e: any) => {
                if (props.onClose)
                    props.onClose(e);
            }}
            onSubmit={() => {
                form.current.dispatchEvent(new Event('submit'));
            }}
            saveText={saveText}
            title={title}
        >
            <form data-parsley-validate onSubmit={handleSubmit(onSubmit)} ref={form}>
                <div className="form-group">
                    <label>Folder name</label>
                    <input
                        name="name"
                        className={classnames("form-control", {
                            'parsley-error': errors.name
                        })}
                        placeholder="Folder name"
                        ref={register({
                            required: ValidationConstants.folder.name,
                        })}
                    />
                    {
                        errors.name && (
                            <ul className="parsley-errors-list filled">
                                <li className="parsley-required">{errors.name.message}</li>
                            </ul>
                        )
                    }
                </div>
            </form>
        </Modal>
    );
};

export default React.memo(connect<FolderEditorProps, any, any>(
    null,
    FoldersThunk.actionCreators
)(FolderEditor as any), ((prevProps, nextProps) => {
    return prevProps.folder == nextProps.folder && prevProps.show == nextProps.show;}));
