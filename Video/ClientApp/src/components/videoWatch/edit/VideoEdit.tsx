import React, { FC, useCallback } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { faCog, faCut, faFeather, faHandScissors, faImage, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type VideoEditProps = RouteComponentProps<{}>;

const VideoEdit: FC<VideoEditProps> = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title mg-b-15">Edit Your Video</h5>
                <nav className="video-editor-nav">
                    <a href="javascript:void(0);" className="nav-editor">
                        <div className="icx">
                            <FontAwesomeIcon icon={faCog}/>
                            <i data-feather="settings"></i>
                        </div>
                        <span>Settings</span>
                    </a>
                    <a href="javascript:void(0);" className="nav-editor">
                        <div className="icx">
                            <FontAwesomeIcon icon={faCut}/>
                            {/* <i data-feather="scissors"></i> */}
                        </div>
                        <span>Trim</span>
                    </a>
                    <a href="javascript:void(0);" className="nav-editor">
                        <div className="icx">
                            <FontAwesomeIcon icon={faMousePointer}/>
                        </div>
                        <span>Call-To-Action</span>
                    </a>
                    <a href="javascript:void(0);" className="nav-editor">
                        <div className="icx">
                            <FontAwesomeIcon icon={faImage}/>
                        </div>
                        <span>Custom Thumbnail</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default connect(

)(VideoEdit as any);