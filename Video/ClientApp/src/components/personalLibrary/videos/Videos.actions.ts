import {Video, VideoActivity} from "models/Video";

export type KnownAction = SetFolderVideos | ArchiveVideo | SetVideoActivities;

export enum KnownActionType {
    SetFolderVideos = 'SET_FOLDER_VIDEOS',
    ArchiveVideo = 'ARCHIVE_VIDEO',
    SetVideoActivities = 'SET_VIDEO_ACTIVITY'
}

export interface SetFolderVideos {
    type: KnownActionType.SetFolderVideos,
    payload: Video[]
}

export interface ArchiveVideo {
    type: KnownActionType.ArchiveVideo,
    payload: number
}

export interface SetVideoActivities {
    type: KnownActionType.SetVideoActivities,
    payload: VideoActivity[]
}
