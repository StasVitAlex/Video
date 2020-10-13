import {User} from 'models/UserInfo';
import {Action, Reducer} from 'redux';
import {KnownAction, KnownActionType} from './Auth.actions';
import { updateObject } from 'utils/utils';

export interface AuthState {
    userInfo: User | undefined;
}

export const reducer: Reducer<AuthState> = (state: AuthState | undefined, incomingAction: Action): AuthState => {
    if (state === undefined) {
        return {userInfo: undefined};
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetUserInfo:
            return {userInfo: action.payload};
        case KnownActionType.LogOut:
            return {userInfo: undefined};
        case KnownActionType.UpdateUserInfo: {
            const userInfo = updateObject(state.userInfo, action.payload);
            return updateObject(state, { userInfo });
        }
        default:
            return state;
    }
};
