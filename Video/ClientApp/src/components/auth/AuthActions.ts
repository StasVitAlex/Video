import { UserInfo } from "models/UserInfo";

export type KnownAction = SetUserInfo;
export enum KnownActionType {
    SetUserInfo = 'SET_USER_INFO'
}
export interface SetUserInfo { type: KnownActionType.SetUserInfo, payload: UserInfo }
