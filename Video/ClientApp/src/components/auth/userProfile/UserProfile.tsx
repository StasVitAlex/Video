import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faCog, faQuestionCircle, faSignOutAlt, faVideo} from '@fortawesome/free-solid-svg-icons'
import {AuthHelper} from "../Auth.helper";
import {UserInfo} from "../../../models/UserInfo";

export default class UserProfile extends React.PureComponent<{ userInfo: UserInfo }, {}> {

    public render() {
        return (
            <div className="dropdown dropdown-profile">
                <a className="dropdown-link" data-toggle="dropdown" data-display="static">
                    <div className="avatar avatar-sm"><img src="../assets/img/users/2.jpg" className="rounded-circle" alt=""></img></div>
                </a>
                <div className="dropdown-menu dropdown-menu-right tx-13">
                    <div className="avatar avatar-lg mg-b-15">
                        <img src="../assets/img/users/2.jpg" className="rounded-circle" alt=""></img>
                    </div>
                    <h6 className="tx-semibold mg-b-5">{this.props.userInfo?.firstName} {this.props.userInfo?.lastName}</h6>
                    <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>

                    <a onClick={this.editProfile} className="dropdown-item"><FontAwesomeIcon icon={faEdit}/>Edit Profile</a>
                    <div className="dropdown-divider"></div>
                    <a onClick={this.openHelpCenter} className="dropdown-item"><FontAwesomeIcon icon={faQuestionCircle}/> Help Center</a>
                    <a onClick={this.openSettings} className="dropdown-item"><FontAwesomeIcon icon={faCog}/>Privacy Settings</a>
                    <a onClick={this.signOut} className="dropdown-item"><FontAwesomeIcon icon={faSignOutAlt}/>Sign Out</a>
                </div>
            </div>
        );
    }


    private signOut = () => {
        this.setState({loggedOut: true});
        AuthHelper.logOut();
    }

    private openSettings = () => {

    }

    private editProfile = () => {

    }

    private openHelpCenter = () => {

    }
}
