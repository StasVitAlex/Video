import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import { Video } from "models/Video";
import { AppThunkAction } from "store";
import { VideoWatchPaths } from "./VideoWatch.paths";

export const actionCreators = {
    getVideo: (link: string): AppThunkAction<Video> => async (dispatch, getState) => {
        try {
            const video = await httpClient.get<void, number>({
                url: VideoWatchPaths.byLink(link)
            } as IHttpClientRequestParameters<any>);
            return video;
        }
        catch {
        }
    }
};