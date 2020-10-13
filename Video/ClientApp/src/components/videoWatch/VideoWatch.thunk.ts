import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import { VideoActionType } from "models/enums/VideoActionType.enum";
import { LogVideoAction } from "models/LogVideoAction";
import { Video } from "models/Video";
import { AppThunkAction } from "store";
import { KnownAction, KnownActionType } from "./VideoWatch.actions";
import { VideoWatchPaths } from "./VideoWatch.paths";

export const actionCreators = {
    getVideo: (link: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const video = await httpClient.get<void, Video>({
                url: VideoWatchPaths.byLink(link)
            } as IHttpClientRequestParameters<any>);
            const authState = getState().auth;
            if (video.createdBy === authState?.userInfo?.id) {
                dispatch({ type: KnownActionType.SetVideo, payload: video });
                return;
            }
            const videoLinksState = getState().videoLinks;
            // TODO expired data
            if (video.linkPassword && !videoLinksState?.availalbeLinks.some((l) => l === video.linkCode))
            {
                dispatch({ type: KnownActionType.CheckVideoAccess, payload: video });
                return;
            }

            dispatch({ type: KnownActionType.SetVideo, payload: video });
        }
        catch {
        }
    },
    logVideoAction: (): AppThunkAction<KnownAction> => async (_dispatch, getState) => {
        try {
            const state = getState();
            const videoWatchState = state.videoWatch;
            const authState = state.auth;
            await httpClient.post<LogVideoAction, void>({
                url: VideoWatchPaths.logVideoAction,
                payload: {
                    userId: authState?.userInfo?.id,
                    videoId: videoWatchState!.video!.id,
                    videoActionType: VideoActionType.View
                }
            });
        }
        catch {
        }
    }
};