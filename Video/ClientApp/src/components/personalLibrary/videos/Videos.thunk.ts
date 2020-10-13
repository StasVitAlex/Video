import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import {Video} from "models/Video";
import {AppThunkAction} from "store";
import {VideosPaths} from "./Videos.paths";
import {KnownActionType, KnownAction} from "./Videos.actions";
import {history} from "../../../index";

export const actionCreators = {
    getVideosByFolder: (folderId: number, isArchived: boolean): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const videos = await httpClient.get<void, Video[]>({url: VideosPaths.byFolder(folderId, isArchived)} as IHttpClientRequestParameters<any>);
            dispatch({type: KnownActionType.SetFolderVideos, payload: videos});
        } catch {
        }
    },

    archiveVideo: (videoId: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            await httpClient.delete<void>({url: VideosPaths.archive(videoId)} as IHttpClientRequestParameters<any>);
            dispatch({type: KnownActionType.ArchiveVideo, payload: videoId});
        } catch {
        }
    },

    uploadVideo: (folderId: number, file: File): AppThunkAction<void> => async (dispatch, getState) => {
        try {
            const formData = new FormData();
            formData.append(
                "file",
                file,
                file.name
            );
            const link = await httpClient.post<any, number>({
                url: VideosPaths.uploadVideo(folderId),
                payload: formData
            } as IHttpClientRequestParameters<any>);
            history.push(`/video/${link}`);
        }
        catch {
        }
    }
};