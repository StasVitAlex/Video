import { UserInfo } from "models/UserInfo";

export type KnownAction = SetUserInfo | LogOut;
export enum KnownActionType {
    SetUserInfo = 'SET_USER_INFO',
    LogOut = 'LOG_OUT'
}
export interface SetUserInfo { type: KnownActionType.SetUserInfo, payload: UserInfo }
export interface LogOut { type: KnownActionType.LogOut }

