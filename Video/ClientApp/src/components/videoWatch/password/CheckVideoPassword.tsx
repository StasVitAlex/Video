import ValidationConstants from "constants/Validation.constants";
import React, { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { RouteComponentProps } from 'react-router';
import classnames from 'classnames';
import { ApplicationState } from "store";
import { KnownActionType } from "../VideoWatch.actions";
import * as VideoWatchStore from '../VideoWatch.reducer';
import * as VideoWatchThunk from '../VideoWatch.thunk';

type VideoWatchProps =
    VideoWatchStore.VideoWatchState &
    typeof VideoWatchThunk.actionCreators &
    RouteComponentProps<{}>;

const VideoWatch: FC<VideoWatchProps> = (props) => {
    const { register, handleSubmit, errors } = useForm<{ password: string }>();
    const dispatch = useDispatch();

    const onSubmit = useCallback(({ password }) => {
        dispatch({ type: KnownActionType.SetVideoAccess });
    }, [dispatch]);

    return (
        <div className="col-12 col-lg-10">
            <div className="mg-b-30" style={{ height: '480px' }}>
                <div className="video-pwd">
                    <form className="form-pwd text-center"  onSubmit={handleSubmit(onSubmit)}>
                        <h5>This video is private</h5>
                        <div className="form-group">
                            <input
                                name="password"
                                className={classnames("form-control", {
                                    'parsley-error': errors.password
                                })}
                                placeholder="Enter password"
                                type="password"
                                ref={register({
                                    required: ValidationConstants.video.password,
                                    validate: (value) => value === props.videoToCheckAccess?.linkPassword
                                })}
                            />
                        </div>
                        <button type="submit" className="btn btn-brand-02 btn-block">Play Video</button>
                    </form>
                </div>
            </div>

            <div className="d-flex align-items-center mg-b-30 ">
                <h1 className="tx-24 mg-b-0">Sending Team Updates with Quick Videos</h1>
            </div>
            <div className="media mg-b-20">
                <img src="../assets/img/users/1.jpg" className="avatar avatar-xl rounded-circle align-self-center" alt="" />
                <div className="media-body align-self-center pd-l-15">
                    <h6 className="mg-b-2">By <a href="" className="link-01">Yasser Al Anzi</a></h6>
                    <span className="tx-13 tx-color-03">Aug 12 10:40pm</span>
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state: ApplicationState) => state.videoWatch,
    VideoWatchThunk.actionCreators
)(VideoWatch as any);