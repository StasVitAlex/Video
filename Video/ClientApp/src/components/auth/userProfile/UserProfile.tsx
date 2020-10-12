import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faCog, faQuestionCircle, faSignOutAlt, faVideo} from '@fortawesome/free-solid-svg-icons';
import {AuthHelper} from "../Auth.helper";
import {UserInfo} from "../../../models/UserInfo";
import Avatar from 'react-avatar';
import UserProfileEditor from "../userProfile/UserProfileEditor";

export default class UserProfile extends React.PureComponent<{ userInfo: UserInfo }, { editProfile: boolean }> {
    public state = {
        editProfile: false
    };

    public render() {
        const fullName = this.props.userInfo?.firstName + ' ' + this.props.userInfo?.lastName;
        return (
            <div className="dropdown dropdown-profile">
                <a className="dropdown-link" data-toggle="dropdown" data-display="static">
                    <div className="avatar avatar-sm"><Avatar name={fullName} size="32" className="rounded-circle"/></div>
                </a>
                <div className="dropdown-menu dropdown-menu-right tx-13">
                    <div className="avatar avatar-lg mg-b-15">
                        <Avatar name={fullName} size="64" className="rounded-circle"/>
                    </div>
                    <h6 className="tx-semibold mg-b-5">{fullName}</h6>
                    <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>

                    <a onClick={this.editProfile} className="dropdown-item"><FontAwesomeIcon icon={faEdit}/>Edit Profile</a>
                    <div className="dropdown-divider"></div>
                    <a onClick={this.openHelpCenter} className="dropdown-item"><FontAwesomeIcon icon={faQuestionCircle}/> Help Center</a>
                    <a onClick={this.openSettings} className="dropdown-item"><FontAwesomeIcon icon={faCog}/>Privacy Settings</a>
                    <a onClick={this.signOut} className="dropdown-item"><FontAwesomeIcon icon={faSignOutAlt}/>Sign Out</a>
                </div>
                <UserProfileEditor show={this.state.editProfile} folder={this.props.userInfo} onClose={() => this.onEditClose()}/>
            </div>
        );
    }

    private onEditClose() {
        this.setState({editProfile: false});
    }


    private signOut = () => {
        AuthHelper.logOut();
    }

    private openSettings = () => {

    }

    private editProfile = () => {
        this.setState({editProfile: true});
    }

    private openHelpCenter = () => {

    }
}
