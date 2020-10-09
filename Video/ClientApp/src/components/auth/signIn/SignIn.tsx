import React, { FC, useCallback } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import MicrosoftLogin from "react-microsoft-login";
import GoogleLogin from 'react-google-login';
// import { useForm } from 'react-hook-form';
import { ReactComponent as GoogleLogo } from 'assets/img/google.svg';
import { ReactComponent as MicrosoftLogo } from 'assets/img/microsoft.svg';
import { ApplicationState } from 'store';
import ValidationConstants from "constants/Validation.constants";
// AIzaSyCmpZCfX8hpQwh7BNgizmwQlYP2tl-wrmA
// import classnames from 'classnames';
import * as Auth from '../Auth.reducer';
import * as AuthThunk from '../Auth.thunk';
import '../auth.css';


type SignInProps =
    Auth.AuthState &
    typeof AuthThunk.actionCreators &
    RouteComponentProps<{}>;

const SignIn: FC<SignInProps> = (props) => {
    // const { register, handleSubmit, errors } = useForm();

    const handleMicrosoft = useCallback(
        (error: any, data: any) => {
            debugger;
            if (error) {
                //TODO handle errors
                console.log(error);
                return;
            }

            props.handleMicrosoftAuth(data.authResponseWithAccessToken.accessToken);
        },
        [],
    );

    const handleGoogle = useCallback(
        (response) => {
            debugger;
        },
        [],
    );

    const handleGoogleError = useCallback(
        (response) => {
            debugger;
        },
        [],
    );

    const onSubmit = useCallback((data) => {

    }, []);

    return (
        <div className="content content-fixed content-auth">
            <div className="container">
                <div className="media align-items-stretch justify-content-center ht-100p pos-relative">
                    <div className="sign-wrapper">
                        <div className="wd-100p">
                            <h3 className="tx-color-01 mg-b-4">Sign In</h3>
                            <p className="tx-color-03 tx-16 mg-b-40">Welcome back! Please signin to continue.</p>

                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
                                className="btn btn-outline-primary btn-auth btn-block"
                                redirectUri={process.env.REACT_APP_GOOGLE_REDIRECT_URL}
                                // buttonText="Login"
                                icon={false}
                                style={undefined}
                                onSuccess={handleGoogle}
                                onFailure={handleGoogleError}
                            >
                                {/* <button className="btn btn-outline-primary btn-auth btn-block"> */}
                                <GoogleLogo />
                                <span>Sign In With Google</span>
                                {/* </button> */}
                            </GoogleLogin>
                            <MicrosoftLogin
                                clientId={process.env.REACT_APP_MICROSOFT_CLIENT_ID!}
                                authCallback={handleMicrosoft}
                                redirectUri={process.env.REACT_APP_MICROSOFT_REDIRECT_URL}
                            >
                                <button className="btn btn-outline-primary btn-auth btn-block">
                                    <MicrosoftLogo />
                                    <span>Sign In With Microsoft</span>
                                </button>
                            </MicrosoftLogin>
                            <div className="divider-text">or</div>
                            {/* <form data-parsley-validate onSubmit={handleSubmit(onSubmit)}> */}
                            <form data-parsley-validate>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        // className={classnames("form-control", {
                                        //     'parsley-error': errors.email
                                        // })}
                                        required
                                        placeholder="yourname@yourmail.com"
                                        // ref={register({
                                        //     required: ValidationConstants.auth.required,
                                        //     pattern: {
                                        //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        //         message: ValidationConstants.auth.invalidEmail
                                        //     }
                                        // })}
                                    />
                                    {/* {
                                        errors.email && (
                                            <ul className="parsley-errors-list filled">
                                                <li className="parsley-required">{errors.email}</li>
                                            </ul>
                                        )
                                    } */}
                                </div>
                                <div className="form-group">
                                    <div className="d-flex justify-content-between mg-b-5">
                                        <label className="mg-b-0-f">Password</label>
                                        <a href="forget-pwd.html" className="tx-13">Forgot password?</a>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        // className={classnames("form-control", {
                                        //     'parsley-error': errors.password
                                        // })}
                                        required
                                        placeholder="Enter your password"
                                        // ref={register({
                                        //     required: ValidationConstants.auth.required,
                                        // })}
                                    />
                                    {/* {
                                        errors.password && (
                                            <ul className="parsley-errors-list filled">
                                                <li className="parsley-required">{errors.password}</li>
                                            </ul>
                                        )
                                    } */}
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