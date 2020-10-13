import * as React from 'react';
import {FC, useCallback, useEffect} from 'react';
import Modal from "components/modal/Modal";
import classnames from "classnames";
import ValidationConstants from "constants/Validation.constants";
import {useForm} from "react-hook-form";
import {RouteComponentProps} from "react-router";
import {connect, useSelector} from "react-redux";
import {ApplicationState} from "store";
import {AuthState} from "../Auth.reducer";
import {UpdateUserProfileVm} from "../../../models/UserInfo";
import * as AuthThunk from '../Auth.thunk';
import ImageUploading, {ImageListType} from "react-images-uploading";
import './UserProfile.css';
import Avatar from "react-avatar";

type UserProfileEditorInternalProps = { show: boolean, onClose?: Function };

type FolderEditorProps =
    typeof AuthThunk.actionCreators &
    UserProfileEditorInternalProps &
    RouteComponentProps<{}>;

const UserProfileEditor: FC<FolderEditorProps> = (props) => {
    const authState: AuthState = useSelector<ApplicationState, any>((state) => state.auth);
    const {register, handleSubmit, errors, reset, setValue} = useForm<UpdateUserProfileVm>();
    const form = React.useRef<any>(null);
    const [images, setImages] = React.useState([]);
    const [image, setImage] = React.useState();
    const maxNumber = 1;

    useEffect(() => {

    }, [props.show]);

    const onSubmit = useCallback((data: UpdateUserProfileVm) => {
        let form = new FormData();
        if (image) {
            form.append('Image', image);
        }
        form.append('FirstName', data.firstName);
        form.append('LastName', data.lastName);
        props.updateUserProfile(form);
        reset();
        setImages([]);
        setImage(null);
        if (props.onClose)
            props.onClose();
    }, [props, reset, image]);


    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImage(imageList[0].file);
        setImages(imageList as never[]);
    };

    if (authState.userInfo) {
        setValue('firstName', authState.userInfo.firstName);
        setValue('lastName', authState.userInfo.lastName);
    }

    const fullName = authState.userInfo?.firstName + ' ' + authState.userInfo?.lastName;

    return (
        <Modal
            show={props.show}
            onClose={(e: any) => {
                setImages([]);
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
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            dragProps
                        }) => (
                            <div className="upload__image-wrapper text-center">
                                {imageList.map((image, index) => (
                                    <div key={index} className="text-center">
                                        <div className="avatar avatar-xxl image-item mg-b-15">
                                            <img src={image.dataURL} className="rounded-circle" alt="" width="100"/>
                                        </div>
                                        <div className="image-item__btn-wrapper">
                                            <button className="btn btn-xs btn-primary mx-1" type="button" onClick={() => onImageUpdate(index)}>Update</button>
                                            <button className="btn btn-xs btn-danger" type="button" onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}

                                {imageList.length == 0 && !authState.userInfo?.imageThumbnailUrl && <Avatar name={fullName} src={authState.userInfo?.imageThumbnailUrl} size="100" className="rounded-circle"/>}
                                {imageList.length == 0 && authState.userInfo?.imageThumbnailUrl && <div className="avatar avatar-xxl image-item mg-b-15"><img src={authState.userInfo.imageThumbnailUrl} className="rounded-circle"/></div>}
                                {imageList.length == 0 && <div className="text-center">
                                    <button type="button"
                                        className="btn btn-xs btn-primary my-2"
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Update
                                    </button>
                                </div>}
                            </div>
                        )}
                    </ImageUploading>
                </div>
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
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input
                        name="lastName"
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
