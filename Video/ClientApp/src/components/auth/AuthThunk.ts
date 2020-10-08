import { httpClient } from "api/HttpClient";
import { IHttpClientRequestParameters } from "api/IHttpClients";
import { UserInfo } from "models/UserInfo";
import { AppThunkAction } from "store";
import { KnownAction, KnownActionType } from "./AuthActions";
import { AuthPaths } from "./AuthPaths";

export const actionCreators = {
    handleMicrosoftAuth: (accessToken: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        debugger;
        const appState = getState();
        if (appState && appState.auth && !appState.auth.userInfo) {
            const userInfo = await httpClient.post<UserInfo>({
                url: AuthPaths.microsoftAuth,
                payload: {
                    accessToken
                }
            } as IHttpClientRequestParameters<any>);
            dispatch({ type: KnownActionType.SetUserInfo, payload: userInfo });
        }
    }
};