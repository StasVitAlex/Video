import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import {Video} from "models/Video";
import {AppThunkAction} from "store";
import {VideosPaths} from "./Videos.paths";
import {KnownActionType, KnownAction} from "./Videos.actions";

export const actionCreators = {
    getVideosByFolder: (folderId: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const videos = await httpClient.get<void, Video[]>({url: VideosPaths.byFolder(folderId)} as IHttpClientRequestParameters<any>);
            dispatch({type: KnownActionType.SetFolderVideos, payload: videos});
        } catch {
        }
    }
};