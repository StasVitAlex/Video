import {User} from "models/UserInfo";
import { Video } from "models/Video";

export type KnownAction = SetVideo | CheckVideoAccess | SetVideoAccess;
export enum KnownActionType {
    SetVideo = 'SET_VIDEO',
    CheckVideoAccess = 'CHECK_VIDEO_ACCESS',
    SetVideoAccess = 'SET_VIDEO_ACCESS'
}
export interface SetVideo { type: KnownActionType.SetVideo, payload: Video }
export interface CheckVideoAccess { type: KnownActionType.CheckVideoAccess, payload: Video }
export interface SetVideoAccess { type: KnownActionType.SetVideoAccess }

