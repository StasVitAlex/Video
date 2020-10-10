import React, { FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type VideoSharingProps = RouteComponentProps<{}>;

const VideoSharing: FC<VideoSharingProps> = (props) => {
    return (
        <div className="card mg-b-25">
            <div className="card-body">
                <h5 className="card-title">Send Your Video</h5>
                <div className="row">
                    <div className="col-lg-9">
                        <a id="copy" href="#" className="btn btn-primary btn-block">Copy Link</a>
                    </div>
                    <div className="col-lg-3">
                        <div className="dropdown">
                            <a href="#" data-toggle="dropdown" className="btn btn-outline-light btn-block btn-icon">
                                <FontAwesomeIcon icon={faShare} />
                            </a>
                            <div className="dropdown-menu">
                                <a href="javascript:void(0);" className="dropdown-item">
                                    <i className="far fa-copy mr-2"></i> Copy Link
                                </a>
                                <a href="javascript:void(0);" className="dropdown-item">
                                    <i className="far fa-code mr-2"></i> Embed
                                </a>
                                <a href="javascript:void(0);" className="dropdown-item">
                                    <i className="fab fa-twitter mr-2"></i> Twitter
                                </a>
                                <a href="javascript:void(0);" className="dropdown-item">
                                    <i className="fab fa-whatsapp mr-2"></i> Whatsapp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div id="collaboration-group">
                    <h6 className="card-title">Whom would you like to collaborate on this video?</h6>
                    <div className="custom-control custom-radio  custom-control-inline mg-b-10">
                        <input type="radio" id="radio1" name="collaboration" className="custom-control-input" checked />
                        <label className="custom-control-label" htmlFor="radio1">Everyone</label>
                    </div>
                    <div className="custom-control custom-radio  custom-control-inline mg-b-10">
                        <input type="radio" id="radio2" name="collaboration" className="custom-control-input" checked />
                        <label className="custom-control-label" htmlFor="radio2">Signed In</label>
                    </div>
                    <div className="custom-control custom-radio  custom-control-inline mg-b-10">
                        <input type="radio" id="radio2" name="collaboration" className="custom-control-input" checked />
                        <label className="custom-control-label" htmlFor="radio2">None</label>
                    </div>
                </div>
                <hr />
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input id="expiry" className="form-control form-control-sm" type="text"
                        placeholder="Enter Video Expiray Date" />
                </div>

                <div className="form-group">
                    <label>Set password</label>
                    <input className="form-control form-control-sm" type="password" placeholder="Enter Password" />
                </div>
            </div>
        </div>
    );
};

export default connect(

)(VideoSharing as any);