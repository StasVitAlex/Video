import { httpClient } from "api/HttpClient";
import { IHttpClientRequestParameters } from "api/IHttpClients";
import { UserInfo } from "models/UserInfo";
import { AppThunkAction } from "store";
import { KnownAction, KnownActionType } from "./Auth.actions";
import { AuthPaths } from "./Auth.paths";
import { history } from '../../index';

export const actionCreators = {
    handleMicrosoftAuth: (accessToken: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();
        debugger;
        if (appState && appState.auth && !appState.auth.userInfo) {
            const userInfo = await httpClient.post<UserInfo>({
                url: AuthPaths.microsoftAuth,
                payload: {
                    accessToken
                }
            } as IHttpClientRequestParameters<any>);
            dispatch({ type: KnownActionType.SetUserInfo, payload: userInfo });
            history.push('/');
        }
    },
    handleGoogleAuth: (tokenId: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();
        debugger;
        if (appState && appState.auth && !appState.auth.userInfo) {
            const userInfo = await httpClient.post<UserInfo>({
                url: AuthPaths.googleAuth,
                payload: {
                    tokenId
                }
            } as IHttpClientRequestParameters<any>);
            debugger;
            dispatch({ type: KnownActionType.SetUserInfo, payload: userInfo });
            history.push('/');
        }
    }
};