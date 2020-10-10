import React, { FC, useCallback } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import UserAvatar from 'assets/img/users/2.jpg';

type CommentsProps = RouteComponentProps<{}>;

const Comments: FC<CommentsProps> = (props) => {
    return (
        <div className="card card-body">
            <div className="mg-b-20">
                <textarea className="form-control" rows={3} placeholder="Type your comment"></textarea>
                <div className="d-sm-flex align-items-center justify-content-between mg-t-10">
                    <div className="tx-13 mg-t-15 mg-sm-t-0 d-flex align-items-center">
                        <div className="mr-2 d-flex text-muted link-01 align-items-center">
                            <a data-type="text" data-pk="0" className="editable">00:00</a>
                            <span className="ml-1">/00:34</span>
                        </div>
                        <button className="btn btn-primary">Post</button>
                    </div>
                </div>
            </div>
            <ul className="list-unstyled">
                <li className="media d-block d-sm-flex">
                    <img src={UserAvatar} className="avatar rounded-circle" alt="" />
                    <div className="media-body pd-l-15">
                        <h6 className="mg-b-5 tx-inverse d-flex align-items-center">Majid Benten
                            <a id="frame-view" href="javascript:void(0);" className="ml-2 link-01">00:12</a>
                            <div id="frame-edit" className="ml-2 text-muted link-01 align-items-center d-none">
                                <a data-type="text" data-pk="0" className="editable">00:12</a>
                                <span className="ml-1">/00:34</span>
                            </div>
                        </h6>
                        <div id="comment-container" className="mg-b-10">
                            <textarea
                                id="comment"
                                className="form-control d-none"
                                rows={3}
                            >
                                    This video shows how you can use quick videos to make sure everyone on the team (including investors and future employees) stays updated on your company's latest news.
                            </textarea>
                            <p id="comment-view" className="mg-b-10">This video shows how you can use quick videos to make sure
                      everyone on the team
                      (including
                      investors
                      and future
                      employees) stays updated on your company's latest news.</p>
                        </div>
                        <div className="d-flex">
                            <span className="d-block tx-13 tx-color-03 mr-3">Aug 12 10:40pm</span>
                            <nav className="nav nav-with-icon tx-13">
                                <a id="edit" href="javascript:void(0);" className="nav-link">
                                    <span id="edit-span"><i data-feather="edit-3"></i> Edit</span>
                                    <span id="save-span" className="d-none"><i data-feather="save"></i> Save</span>
                                </a>
                                <a id="reply" href="javascript:void(0);" className="nav-link"><i data-feather="message-square"></i>
                        Reply</a>
                                <a id="delete" href="javascript:void(0);" className="nav-link"><i data-feather="trash"></i> Delete</a>
                            </nav>
                        </div>
                        <div id="reply-container" className="mg-t-10 d-none">
                            <textarea className="form-control" rows={3} placeholder="Type your comment"></textarea>
                            <div className="d-sm-flex align-items-center justify-content-between mg-t-10">
                                <div className="tx-13 mg-t-15 mg-sm-t-0 d-flex align-items-center">
                                    <button className="btn btn-primary">Reply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default connect(

)(Comments as any);