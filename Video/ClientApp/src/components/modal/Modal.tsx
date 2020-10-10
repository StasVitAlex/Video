import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faChevronDown, faClock, faFolder, faShareAlt, faStar, faUserPlus, faVideo} from "@fortawesome/free-solid-svg-icons";
import FolderEditor from "../folder/FolderEditor";

export default class Modal extends React.PureComponent<{ show: boolean, onClose: Function, title: string, saveText: string }, {}> {

    public state = {}

    public render() {
        const classes = "modal effect-scale " + (this.props.show ? "d-block show modal-backdrop" : " ");
        return (
            <div className={classes} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body pd-20 pd-sm-30">
                            <button onClick={() => this.props.onClose()} type="button" className="close pos-absolute t-15 r-20" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>

                            <h5 className="tx-18 tx-sm-20 mg-b-30">{this.props.title}</h5>
                            <div className="mg-t-20">
                                {this.props.children}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">{this.props.saveText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
