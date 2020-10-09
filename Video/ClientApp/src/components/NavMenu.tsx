import * as React from 'react';
import './NavMenu.css';
import logo from 'assets/img/app_logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell, faSearch, faArrowLeft, faHamburger, faTimes} from '@fortawesome/free-solid-svg-icons'
import Notifications from "./notifications/Notifications";
import UserProfile from "./auth/userProfile/UserProfile";

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header className="navbar navbar-header navbar-header-fixed">
                <a href="javascript:void(0);" id="mainMenuOpen" className="burger-menu d-none"> <FontAwesomeIcon icon={faHamburger}/></a>
                <a href="javascript:void(0);" id="filemgrMenu" className="burger-menu d-lg-none"> <FontAwesomeIcon icon={faArrowLeft}/></a>
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
                        <a id="mainMenuClose" href="javascript:void(0);"> <FontAwesomeIcon icon={faTimes}/></a>
                    </div>
                    <ul className="nav navbar-menu">
                        <li className="nav-label pd-l-20 pd-lg-l-25 d-lg-none">Main Navigation</li>
                        <li className="nav-item"><a href="index.html" className="nav-link"><i data-feather="file-text"></i>
                            Personal Library</a></li>
                    </ul>
                    <div className="search-form">
                        <input type="search" className="form-control" placeholder="Search"></input>
                        <button className="btn" type="button"><FontAwesomeIcon icon={faSearch}/></button>
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="dropdown dropdown-notification">
                        <a href="javascript:void(0);" className="dropdown-link new-indicator" data-toggle="dropdown">
                            <FontAwesomeIcon icon={faBell}/>
                            <span>2</span>
                        </a>
                        <Notifications/>
                    </div>
                    <div className="dropdown dropdown-profile">
                        <a href="javascript:void(0);" className="dropdown-link" data-toggle="dropdown" data-display="static">
                            <div className="avatar avatar-sm"><img src="../assets/img/users/2.jpg" className="rounded-circle" alt=""></img></div>
                        </a>
                        <UserProfile/>
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

