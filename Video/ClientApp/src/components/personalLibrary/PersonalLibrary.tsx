import * as React from 'react';
import { connect } from 'react-redux';
import 'assets/css/main.filemgr.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faVideo, faChevronDown, faFolder, faShareAlt, faClock, faStar, faTimes, faChevronRight, faBell, faStopCircle, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

const PersonalLibrary = () => (
    <div className="filemgr-wrapper">
        <div className="filemgr-sidebar">
            <div className="filemgr-sidebar-header">
                <a href="upload.html" className="btn btn-xs btn-primary"> <FontAwesomeIcon icon={faVideo}/> Upload</a>
                <div className="dropdown dropdown-icon flex-fill mg-l-10">
                    <button className="btn btn-xs btn-white" data-toggle="dropdown">Folder <FontAwesomeIcon icon={faChevronDown}/></button>
                    <div className="dropdown-menu tx-13">
                        <a className="dropdown-item"><FontAwesomeIcon icon={faFolder}/><span>New Folder</span></a>
                        <a className="dropdown-item"><FontAwesomeIcon icon={faFolder}/><span>New Public
                Folder</span></a>
                    </div>
                </div>
            </div>
            <div className="filemgr-sidebar-body">
                <div className="pd-t-20 pd-b-10 pd-x-10">
                    <label className="tx-sans tx-uppercase tx-medium tx-10 tx-spacing-1 tx-color-03 pd-l-10">Personal Library</label>
                    <nav className="nav nav-sidebar tx-13">
                        <a className="nav-link active"><FontAwesomeIcon icon={faFolder}/> <span>All
                Files</span></a>
                        <a className="nav-link"><FontAwesomeIcon icon={faVideo}/> <span>My Videos</span></a>
                        <a className="nav-link"><FontAwesomeIcon icon={faShareAlt}/> <span>Shared
                Videos</span></a>
                        <a className="nav-link"><FontAwesomeIcon icon={faClock}/> <span>Recents</span></a>
                        <a className="nav-link"><FontAwesomeIcon icon={faStar}/> <span>Important</span></a>
                    </nav>
                </div>
            </div>
        </div>

        <div className="filemgr-content">
            <div className="filemgr-content-body">
                <div className="filemgr-body-side d-none">
                    <div className="filemgr-info-header mg-b-15">
                        <h5 className="mb-0 d-flex align-items-center">
                            <FontAwesomeIcon className={'mr-1'} icon={faVideo}/> <span className="wd-200 text-truncate d-inline-block">Send Team Updates with
                Quick
                Videos</span> </h5>
                        <a id="close-sidebar">
                            <FontAwesomeIcon icon={faTimes}/>
                        </a>
                    </div>
                    <div id="folder-info" className="filemgr-info-body">
                        <div className="mg-b-10">
                            <label className="d-block mg-b-0 text-muted">Creation Date</label>
                            <p>24/09/2020</p>
                        </div>
                        <div className="mg-b-10">
                            <label className="d-block mg-b-0 text-muted">Duration</label>
                            <p>1:38</p>
                        </div>
                        <div className="mg-b-10">
                            <label className="d-block mg-b-0 text-muted">Views</label>
                            <p>8</p>
                        </div>
                        <div className="mg-b-10">
                            <label className="d-block mg-b-0 text-muted">Shared Link</label>
                            <p>2 Links</p>
                        </div>
                        <nav className="nav nav-with-icon tx-13 mg-b-10">
                            <a id="manage-access-open" className="nav-link">
                Manage Shared Links
                                <FontAwesomeIcon className={'mr-1'} icon={faChevronRight}/>
                            </a>
                        </nav>
                        <div className="mg-b-10">
                            <label className="d-block text-muted">Activity</label>
                            <ul className="list-unstyled">
                                <li className="mg-b-10">
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-online">
                                            <img src="../assets/img/users/1.jpg" className="rounded-circle" alt="" />
                                        </div>
                                        <div className="media-body mg-l-15">
                                            <p className="tx-12 mg-b-0"><strong>Majid Benten</strong> has viewed your video</p>
                                            <span className="tx-12">Aug 15 12:32pm</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="mg-b-10">
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-online">
                                            <img src="../assets/img/users/1.jpg" className="rounded-circle" alt="" />
                                        </div>
                                        <div className="media-body mg-l-15">
                                            <p className="tx-12 mg-b-0"><strong>Majid Benten</strong> has viewed your video</p>
                                            <span className="tx-12">Aug 15 12:32pm</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="mg-b-10">
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-online">
                                            <img src="../assets/img/users/1.jpg" className="rounded-circle" alt="" />
                                        </div>
                                        <div className="media-body mg-l-15">
                                            <p className="tx-12 mg-b-0"><strong>Majid Benten</strong> has viewed your video</p>
                                            <span className="tx-12">Aug 15 12:32pm</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="mg-b-10">
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-online">
                                            <img src="../assets/img/users/1.jpg" className="rounded-circle" alt="" />
                                        </div>
                                        <div className="media-body mg-l-15">
                                            <p className="tx-12 mg-b-0"><strong>Majid Benten</strong> has viewed your video</p>
                                            <span className="tx-12">Aug 15 12:32pm</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="mg-b-10">
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-online">
                                            <img src="../assets/img/users/1.jpg" className="rounded-circle" alt="" />
                                        </div>
                                        <div className="media-body mg-l-15">
                                            <p className="tx-12 mg-b-0"><strong>Majid Benten</strong> has viewed your video</p>
                                            <span className="tx-12">Aug 15 12:32pm</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="mg-b-10">
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-online">
                                            <img src="../assets/img/users/1.jpg" className="rounded-circle" alt="" />
                                        </div>
                                        <div className="media-body mg-l-15">
                                            <p className="tx-12 mg-b-0"><strong>Majid Benten</strong> has viewed your video</p>
                                            <span className="tx-12">Aug 15 12:32pm</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="folder-access" className="filemgr-info-body d-none">
                        <div className="d-flex align-items-center justify-content-between mg-b-20">
                            <a id="manage-access-cancel" className="tx-13 tx-spacing-1 tx-semibold mg-b-0 d-flex align-items-center">
                                <FontAwesomeIcon className={'mr-2'} icon={faArrowLeft}/>Manage Shared Links</a>
                        </div>
                        <ul className="list-unstyled media-list mg-b-15">
                            <li className="media align-items-center mg-b-10">
                                <div className="media-body pd-l-15">
                                    <p className="tx-medium mg-b-0 lh-1">
                                        <a className="link-01 wd-200 d-inline-block text-truncate">https://drive.google.com/drive/u/0/</a>
                                    </p>
                                    <span className="tx-12 tx-color-03">Generated on: 28/09/2020</span>
                                </div>
                                <div className="mg-l-auto d-flex align-self-center">
                                    <div className="d-flex align-items-center tx-18 ">
                                        <div className="dropdown">
                                            <a data-toggle="dropdown" href="" className="link-03 wd-20 d-inline-block text-center lh-0 mg-l-10"><i
                                                className="icon ion-md-more"></i></a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#"><FontAwesomeIcon className={'mr-2'} icon={faStopCircle}/>Stop Sharing</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pd-20 pd-lg-25 pd-xl-30 flex-1">
                    <h4 className="mg-b-10 mg-lg-b-15">Personal Library</h4>

                    <hr className="mg-y-10 bd-0" />
                    <label className="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mg-b-15">Folders</label>
                    <div className="row row-xs">
                        <div className="col-sm-6 col-lg-4 col-xl-3 folder-item">
                            <div className="media media-folder">
                                <FontAwesomeIcon icon={faFolder}/>
                                <div className="media-body">
                                    <h6><a className="link-02">My Videos</a></h6>
                                    <span>2 files</span>
                                </div>
                                <div className="dropdown-file">
                                    <a className="dropdown-link" data-toggle="dropdown"><i data-feather="more-vertical"></i></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#modalRename" data-toggle="modal" className="dropdown-item rename"><i data-feather="edit"></i>Rename</a>
                                        <a href="#" className="dropdown-item archive"><i data-feather="archive"></i>Archive</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xl-3 mg-t-10 mg-sm-t-0 folder-item">
                            <div className="media media-folder">
                                <FontAwesomeIcon icon={faFolder}/>
                                <div className="media-body">
                                    <h6><a href="sub-folder.html" className="link-02">Shared Videos</a></h6>
                                    <span>8 files</span>
                                </div>
                                <div className="dropdown-file">
                                    <a className="dropdown-link" data-toggle="dropdown"><i data-feather="more-vertical"></i></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#modalRename" data-toggle="modal" className="dropdown-item rename"><i data-feather="edit"></i>Rename</a>
                                        <a href="#" className="dropdown-item archive"><i data-feather="archive"></i>Archive</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xl-3 mg-t-10 mg-xl-t-0 folder-item">
                            <div className="media media-folder">
                                <FontAwesomeIcon icon={faFolder}/>
                                <div className="media-body">
                                    <h6><a href="empty-folder.html" className="link-02">Personal Recordings</a></h6>
                                    <span>0 files</span>
                                </div>
                                <div className="dropdown-file">
                                    <a className="dropdown-link" data-toggle="dropdown"><i data-feather="more-vertical"></i></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#modalRename" data-toggle="modal" className="dropdown-item rename"><i data-feather="edit"></i>Rename</a>
                                        <a href="#" className="dropdown-item archive"><i data-feather="archive"></i>Archive</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mg-y-40 bd-0" />
                    <label className="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mg-b-15">Recent
            Videos</label>
                    <div className="row row-xs">
                        <div className="col-6 col-sm-4 col-lg-4 video-item">
                            <div className="card card-file">
                                <div className="dropdown-file">
                                    <a className="dropdown-link" data-toggle="dropdown"><i data-feather="more-vertical"></i></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#modalRename" data-toggle="modal" className="dropdown-item rename"><i data-feather="edit"></i>Rename</a>
                                        <a href="#" className="dropdown-item archive"><i data-feather="archive"></i>Archive</a>

                                    </div>
                                </div>
                                <div className="card-file-thumb card-img-thumb tx-primary">
                                    <img src="../assets/img/demo.gif" />
                                </div>
                                <div className="card-body">
                                    <h6><a href="view.html" className="link-01">Sending Team Updates with Quick Videos</a></h6>
                                    <ul className="list-inline d-flex mg-t-5 mg-b-0">
                                        <li className="list-inline-item d-flex align-items-center">
                                            <i className="far fa-clock tx-color-03 mg-r-5"></i>
                                            <span className="tx-sans tx-uppercase tx-medium tx-color-03">1:38</span>
                                        </li>
                                        <li className="list-inline-item d-flex align-items-center mg-l-5">
                                            <i className="far fa-eye tx-color-03 mg-r-5"></i>
                                            <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">269 views</span>
                                        </li>
                                        <li className="list-inline-item d-flex align-items-center mg-l-5">
                                            <i className="far fa-calendar-day tx-color-03 mg-r-5"></i>
                                            <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">3 years ago</span>
                                        </li>
                                        <li className="list-inline-item d-flex align-items-center ml-auto">
                                            <a className="link-02" id="info">
                                                <i className="far fa-info-circle tx-color-03 mg-r-5"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
);

export default connect()(PersonalLibrary);
