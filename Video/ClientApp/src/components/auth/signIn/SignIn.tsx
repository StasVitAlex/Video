import React, { FC, useCallback } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import MicrosoftLogin from "react-microsoft-login";
import { ReactComponent as GoogleLogo } from 'assets/img/google.svg';
import { ReactComponent as MicrosoftLogo } from 'assets/img/microsoft.svg';
import { ApplicationState } from 'store';
import * as Auth from '../AuthReducer';
import * as AuthThunk from '../AuthThunk';
import '../auth.css';

type SignInProps =
    Auth.AuthState &
    typeof AuthThunk.actionCreators &
    RouteComponentProps<{}>;

const SignIn: FC<SignInProps> = (props) => {
    const cl = process.env;
    debugger;

    const authHandler = useCallback(
        (error: any, data: any) => {
            if (error) {
                //TODO handle errors
                console.log(error);
                return;
            }

            props.handleMicrosoftAuth(data.authResponseWithAccessToken.accessToken);
        },
        [],
    );

    return (
        <div className="content content-fixed content-auth">
            <div className="container">
                <div className="media align-items-stretch justify-content-center ht-100p pos-relative">
                    <div className="sign-wrapper">
                        <div className="wd-100p">
                            <h3 className="tx-color-01 mg-b-4">Sign In</h3>
                            <p className="tx-color-03 tx-16 mg-b-40">Welcome back! Please signin to continue.</p>

                            <button className="btn btn-outline-primary btn-auth btn-block">
                                <GoogleLogo />
                                <span>Sign In With Google</span>
                            </button>
                            <MicrosoftLogin
                                clientId={process.env.REACT_APP_MICROSOFT_CLIENT_ID!}
                                authCallback={authHandler}
                                redirectUri={`${process.env.REACT_APP_MICROSOFT_REDIRECT_URL}`}
                            >
                                <button className="btn btn-outline-primary btn-auth btn-block">
                                    <MicrosoftLogo />
                                    <span>Sign In With Microsoft</span>
                                </button>
                            </MicrosoftLogin>
                            <div className="divider-text">or</div>
                            <form action="index.html" data-parsley-validate>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" required placeholder="yourname@yourmail.com" />
                                </div>
                                <div className="form-group">
                                    <div className="d-flex justify-content-between mg-b-5">
                                        <label className="mg-b-0-f">Password</label>
                                        <a href="forget-pwd.html" className="tx-13">Forgot password?</a>
                                    </div>
                                    <input type="password" className="form-control" required placeholder="Enter your password" />
                                </div>
                                <button type="submit" id="sign-in" className="btn btn-brand-02 btn-block">Sign In</button>
                            </form>
                            <div className="tx-13 mg-t-20 tx-center">Don't have an account? <a href="signup.html">Create an
                                Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state: ApplicationState) => state.auth,
    AuthThunk.actionCreators
)(SignIn as any);