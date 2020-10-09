
import { UserInfo } from 'models/UserInfo';
import { Action, Reducer } from 'redux';
import { KnownAction, KnownActionType } from './Auth.actions';

export interface AuthState {
    userInfo: UserInfo | undefined;
}

export const reducer: Reducer<AuthState> = (state: AuthState | undefined, incomingAction: Action): AuthState => {
    if (state === undefined) {
        return { userInfo: undefined };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetUserInfo:
            return { userInfo: action.payload };
        case KnownActionType.LogOut:
            return { userInfo: undefined };
        default:
            return state;
    }
};
