import * as React from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import logo from 'assets/img/app_logo.png';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header className="navbar navbar-header navbar-header-fixed">
                <a id="mainMenuOpen" className="burger-menu d-none"><i data-feather="menu"></i></a>
                <a id="filemgrMenu" className="burger-menu d-lg-none"><i data-feather="arrow-left"></i></a>
                <div className="navbar-brand">
                    <a href="index.html" className="app-logo">
                        <img src={logo}></img>
                        <span>Video</span>
                    </a>
                </div>
                <div id="navbarMenu" className="navbar-menu-wrapper">
                    <div className="navbar-menu-header">
                        <a href="index.html" className="app-logo">
                            <img src="../assets/img/app_logo.png"></img>
                            <span>eMeetings</span>
                        </a>
                        <a id="mainMenuClose"><i data-feather="x"></i></a>
                    </div>
                    <ul className="nav navbar-menu">
                        <li className="nav-label pd-l-20 pd-lg-l-25 d-lg-none">Main Navigation</li>
                        <li className="nav-item"><a href="index.html" className="nav-link"><i data-feather="file-text"></i>
                            Personal Library</a></li>
                    </ul>
                    <div className="search-form">
                        <input type="search" className="form-control" placeholder="Search"></input>
                        <button className="btn" type="button"><i
                            data-feather="search"></i></button>
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="dropdown dropdown-notification">
                        <a className="dropdown-link new-indicator" data-toggle="dropdown">
                            <i data-feather="bell"></i>
                            <span>2</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-header">Notifications</div>
                            <a className="dropdown-item">
                                <div className="media">
                                    <div className="avatar avatar-sm avatar-online">
                                        <img src="../assets/img/users/1.jpg" className="rounded-circle" alt=""></img>
                                    </div>
                                    <div className="media-body mg-l-15">
                                        <p><strong>Majid Benten</strong> has viewed your video</p>
                                        <span>Aug 15 12:32pm</span>
                                    </div>
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div className="media">
                                    <div className="avatar avatar-sm avatar-online">
                                        <img src="../assets/img/users/2.jpg" className="rounded-circle" alt=""></img>
                                    </div>
                                    <div className="media-body mg-l-15">
                                        <p><strong>Nasser Shahrani</strong> just shared a video with you</p>
                                        <span>Aug 13 04:16am</span>
                                    </div>
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div className="media">
                                    <div className="avatar avatar-sm avatar-online">
                                        <img src="../assets/img/users/3.jpg" className="rounded-circle" alt=""></img>
                                    </div>
                                    <div className="media-body mg-l-15">
                                        <p><strong>Reema Al Sherif</strong> added new comment on your video</p>
                                        <span>Aug 13 02:56am</span>
                                    </div>
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div className="media">
                                    <div className="avatar avatar-sm avatar-online">
                                        <img src="../assets/img/users/4.jpg" className="rounded-circle" alt=""></img>
                                    </div>
                                    <div className="media-body mg-l-15">
                                        <p><strong>Talal Al Hamdan</strong> added new comment on your video.</p>
                                        <span>Aug 12 10:40pm</span>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-footer"><a>View all Notifications</a></div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-profile">
                        <a className="dropdown-link" data-toggle="dropdown" data-display="static">
                            <div className="avatar avatar-sm"><img src="../assets/img/users/2.jpg" className="rounded-circle" alt=""></img></div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right tx-13">
                            <div className="avatar avatar-lg mg-b-15">
                                <img src="../assets/img/users/2.jpg" className="rounded-circle" alt=""></img>
                            </div>
                            <h6 className="tx-semibold mg-b-5">Yasser Al Anezi</h6>
                            <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>

                            <a className="dropdown-item"><i data-feather="edit-3"></i> Edit Profile</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item"><i data-feather="help-circle"></i> Help Center</a>
                            <a className="dropdown-item"><i data-feather="settings"></i>Privacy Settings</a>
                            <a href="signin.html" className="dropdown-item"><i data-feather="log-out"></i>Sign Out</a>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
