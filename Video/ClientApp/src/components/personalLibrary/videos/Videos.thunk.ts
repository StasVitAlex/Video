import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import {Video} from "models/Video";
import {AppThunkAction} from "store";
import {VideosPaths} from "./Videos.paths";

export const actionCreators = {
    getVideosByFolder: (folderId: number): AppThunkAction<Video> => async (dispatch, getState) => {
        try {
            const video = await httpClient.get<void, number>({
                url: VideosPaths.byFolder(folderId)
            } as IHttpClientRequestParameters<any>);
            return video;
        } catch {
        }
    }
};