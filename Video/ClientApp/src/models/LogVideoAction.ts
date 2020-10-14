import { UserActionType } from "./enums/UserActionType.enum";

export interface LogVideoAction {
    userId?: number;
    videoId: number;
    userActionType: UserActionType
}