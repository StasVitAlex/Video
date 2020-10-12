import {User} from "models/UserInfo";

export type KnownAction = SetUserInfo | LogOut | UpdateUserInfo;
export enum KnownActionType {
    SetUserInfo = 'SET_USER_INFO',
    LogOut = 'LOG_OUT',
    UpdateUserInfo = 'UPDATE_USER_INFO'
}
export interface SetUserInfo { type: KnownActionType.SetUserInfo, payload: User }
export interface UpdateUserInfo { type: KnownActionType.UpdateUserInfo, payload: User }
export interface LogOut { type: KnownActionType.LogOut }

