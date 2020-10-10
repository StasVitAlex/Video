import * as React from 'react';
import './NavMenu.css';
import logo from 'assets/img/app_logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faArrowLeft, faHamburger, faTimes, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import Notifications from "./notifications/Notifications";
import UserProfile from "./auth/userProfile/UserProfile";
import {connect} from "react-redux";
import {ApplicationState} from "../store";
import {Link} from 'react-router-dom';
import {UserInfo} from "../models/UserInfo";
import {history} from "../index";

class NavMenu extends React.PureComponent<{ isAuthenticated: boolean, userInfo: UserInfo }, { isProfileOpened: boolean, isNotificationsOpened: boolean }> {
    public state = {
        isProfileOpened: false,
        isNotificationsOpened: false,
    };

    public render() {
        return (
            <header className="navbar navbar-header navbar-header-fixed">
                <a href="javascript:void(0);" id="mainMenuOpen" className="burger-menu d-none"> <FontAwesomeIcon icon={faHamburger}/></a>
                <a href="javascript:void(0);" id="filemgrMenu" className="burger-menu d-lg-none"> <FontAwesomeIcon icon={faArrowLeft}/></a>
                <div className="navbar-brand">
                    <a onClick={() => history.push('/')} className="app-logo">
                        <img src={logo}></img>
                        <span>Video</span>
                    </a>
                </div>
                {(() => {
                    if (this.props.isAuthenticated) {
                        return (<div id="navbarMenu" className="navbar-menu-wrapper">
                            <div className="navbar-menu-header">
                                <a className="app-logo">
                                    <img src="../assets/img/app_logo.png"></img>
                                    <span>eMeetings</span>
                                </a>
                                <a id="mainMenuClose" href="javascript:void(0);"> <FontAwesomeIcon icon={faTimes}/></a>
                            </div>

                            <ul className="nav navbar-menu">
                                <li className="nav-label pd-l-20 pd-lg-l-25 d-lg-none">Main Navigation</li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <i data-feather="file-text"></i>
                                        Personal Library
                                    </Link>
                                  </li>
                            </ul>
                            <div className="search-form">
                                <input type="search" className="form-control" placeholder="Search"></input>
                                <button className="btn" type="button"><FontAwesomeIcon icon={faSearch}/></button>
                            </div>
                        </div>)
                    }
                })()}

                {(() => {
                    if (this.props.isAuthenticated) {
                        return (<div className="navbar-right">
                            <Notifications/>
                            <UserProfile userInfo={this.props.userInfo}/>
                        </div>);
                    } else {
                        return (
                            <div className="navbar-right">
                                <Link to="/signUp" className="btn btn-buy">
                                    <FontAwesomeIcon icon={faUserPlus}/> <span>Sign up for free</span>
                                </Link>
                            </div>);
                    }
                })()}

            </header>
        );
    }
}


export default connect((state: ApplicationState) => {
    return {isAuthenticated: state.auth && state.auth.userInfo, userInfo: state.auth?.userInfo}
}, {})(NavMenu as any);