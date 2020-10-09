import * as React from 'react';

export default class Notifications extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-header">Notifications</div>
                <a href="javascript:void(0);" className="dropdown-item">
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
                <a href="javascript:void(0);" className="dropdown-item">
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
                <a href="javascript:void(0);" className="dropdown-item">
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
                <a href="javascript:void(0);" className="dropdown-item">
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
                <div className="dropdown-footer"><a href="javascript:void(0);">View all Notifications</a></div>
            </div>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
