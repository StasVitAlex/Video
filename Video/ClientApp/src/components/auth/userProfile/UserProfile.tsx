import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faCog, faQuestionCircle, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {AuthHelper} from "../Auth.helper";
import {User} from "../../../models/UserInfo";
import Avatar from 'react-avatar';
import UserProfileEditor from "../userProfile/UserProfileEditor";
import {connect} from "react-redux";
import {ApplicationState} from "../../../store";

class UserProfile extends React.PureComponent<{ userInfo: User }, { editProfile: boolean }> {
    public state = {
        editProfile: false,
    };

    public render() {
        debugger;
        const fullName = this.props.userInfo.firstName + ' ' + this.props.userInfo?.lastName;
        return (
            <div  className="dropdown dropdown-profile">
                <a className="dropdown-link" data-toggle="dropdown" data-display="static">
                    <div className="avatar avatar-sm">
                        {!this.props.userInfo.imageThumbnailUrl && <Avatar name={fullName} src={this.props.userInfo.imageThumbnailUrl} size="32" className="rounded-circle"/>}
                        {this.props.userInfo.imageThumbnailUrl && <img src={this.props.userInfo.imageThumbnailUrl} className="rounded-circle"/>}
                    </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right tx-13">
                    <div className="avatar avatar-lg mg-b-15">
                        {!this.props.userInfo.imageThumbnailUrl && <Avatar name={fullName} src={this.props.userInfo.imageThumbnailUrl} size="64" className="rounded-circle"/>}
                        {this.props.userInfo.imageThumbnailUrl && <img src={this.props.userInfo.imageThumbnailUrl} className="rounded-circle"/>}
                    </div>
                    <h6 className="tx-semibold mg-b-5">{fullName}</h6>
                    <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>

                    <a onClick={this.editProfile} className="dropdown-item"><FontAwesomeIcon icon={faEdit}/>Edit Profile</a>
                    <div className="dropdown-divider"></div>
                    <a onClick={this.openHelpCenter} className="dropdown-item"><FontAwesomeIcon icon={faQuestionCircle}/> Help Center</a>
                    <a onClick={this.openSettings} className="dropdown-item"><FontAwesomeIcon icon={faCog}/>Privacy Settings</a>
                    <a onClick={this.signOut} className="dropdown-item"><FontAwesomeIcon icon={faSignOutAlt}/>Sign Out</a>
                </div>
                <UserProfileEditor show={this.state.editProfile} onClose={() => this.onEditClose()}/>
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

export default connect((state: ApplicationState) => {
    return { userInfo: state.auth?.userInfo };
}, {})(UserProfile as any);

