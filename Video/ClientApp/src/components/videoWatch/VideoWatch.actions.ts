import {User} from "models/UserInfo";
import { Video } from "models/Video";

export type KnownAction = SetVideo;
export enum KnownActionType {
    SetVideo = 'SET_Video'
}
export interface SetVideo { type: KnownActionType.SetVideo, payload: Video }
