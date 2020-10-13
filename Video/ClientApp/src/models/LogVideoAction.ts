import { VideoActionType } from "./enums/VideoActionType.enum";

export interface LogVideoAction {
    userId?: number;
    videoId: number;
    videoActionType: VideoActionType
}