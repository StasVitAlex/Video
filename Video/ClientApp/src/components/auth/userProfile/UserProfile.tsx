import * as React from 'react';

export default class UserProfile extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <div className="dropdown-menu dropdown-menu-right tx-13">
                <div className="avatar avatar-lg mg-b-15">
                    <img src="../assets/img/users/2.jpg" className="rounded-circle" alt=""></img>
                </div>
                <h6 className="tx-semibold mg-b-5">Yasser Al Anezi</h6>
                <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>

                <a href="javascript:void(0);" className="dropdown-item"><i data-feather="edit-3"></i> Edit Profile</a>
                <div className="dropdown-divider"></div>
                <a href="javascript:void(0);" className="dropdown-item"><i data-feather="help-circle"></i> Help Center</a>
                <a href="javascript:void(0);" className="dropdown-item"><i data-feather="settings"></i>Privacy Settings</a>
                <a href="signin.html" className="dropdown-item"><i data-feather="log-out"></i>Sign Out</a>
            </div>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
