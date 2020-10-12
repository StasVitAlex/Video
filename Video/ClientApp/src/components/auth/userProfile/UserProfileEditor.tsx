import * as React from 'react';
import {FC, useCallback, useEffect, useState} from 'react';
import Modal from "components/modal/Modal";
import classnames from "classnames";
import ValidationConstants from "constants/Validation.constants";
import {useForm} from "react-hook-form";
import {RouteComponentProps} from "react-router";
import {connect, useSelector} from "react-redux";
import {ApplicationState} from "store";
import {AuthState} from "../Auth.reducer";
import {UpdateUserProfileVm, UserInfo} from "../../../models/UserInfo";
import * as AuthThunk from '../Auth.thunk';

type UserProfileEditorInternalProps = { show: boolean, userDetails?: UserInfo, onClose?: Function };

type FolderEditorProps =
    typeof AuthThunk.actionCreators &
    UserProfileEditorInternalProps &
    RouteComponentProps<{}>;

const UserProfileEditor: FC<FolderEditorProps> = (props) => {
    const authState: AuthState = useSelector<ApplicationState, any>((state) => state.folders);
    const {register, handleSubmit, errors, reset, setValue} = useForm<UpdateUserProfileVm>();
    const form = React.useRef<any>(null);

    useEffect(() => {

    }, [props.userDetails, props.show]);

    const onSubmit = useCallback((data: UpdateUserProfileVm) => {

    }, [authState.userInfo, props, reset]);

    if (props.userDetails) {
        setValue('firstName', props.userDetails.firstName);
        setValue('lastName', props.userDetails.lastName);
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
            saveText="Save"
            title="Edit profile"
        >
            <form data-parsley-validate onSubmit={handleSubmit(onSubmit)} ref={form}>
                <div className="form-group">
                    <label>First name</label>
                    <input
                        name="firstName"
                        className={classnames("form-control", {
                            'parsley-error': errors.firstName
                        })}
                        placeholder="First name"
                        ref={register({
                            required: ValidationConstants.auth.required,
                        })}
                    />
                    {
                        errors.firstName && (
                            <ul className="parsley-errors-list filled">
                                <li className="parsley-required">{errors.firstName.message}</li>
                            </ul>
                        )
                    }
                    <label className="py-md-1">Last name</label>
                    <input
                        name="firstName"
                        className={classnames("form-control", {
                            'parsley-error': errors.lastName
                        })}
                        placeholder="Last name"
                        ref={register({
                            required: ValidationConstants.auth.required,
                        })}
                    />
                    {
                        errors.lastName && (
                            <ul className="parsley-errors-list filled">
                                <li className="parsley-required">{errors.lastName.message}</li>
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
    AuthThunk.actionCreators
)(UserProfileEditor as any), ((prevProps, nextProps) => {
    return prevProps.folder == nextProps.folder && prevProps.show == nextProps.show;
}));
