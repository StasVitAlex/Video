import { Video } from "models/Video";

export type KnownAction = SetFolderVideos | ArchiveVideo;
export enum KnownActionType {
    SetFolderVideos = 'SET_FOLDER_VIDEOS',
    ArchiveVideo = 'ARCHIVE_VIDEO'
}
export interface SetFolderVideos { type: KnownActionType.SetFolderVideos, payload: Video[] }
export interface ArchiveVideo { type: KnownActionType.ArchiveVideo, payload: number }
