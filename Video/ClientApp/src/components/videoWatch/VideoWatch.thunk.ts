import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import { VideosPaths } from "components/personalLibrary/videos/Videos.paths";
import { history } from "index";
import { UserActionType } from "models/enums/UserActionType.enum";
import { LogVideoAction } from "models/LogVideoAction";
import { Video } from "models/Video";
import { AppThunkAction } from "store";
import { KnownAction, KnownActionType } from "./VideoWatch.actions";

export const actionCreators = {
    getVideo: (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const video = await httpClient.get<void, Video>({
                url: VideosPaths.byId(id)
            } as IHttpClientRequestParameters<any>);
            dispatch({ type: KnownActionType.SetVideo, payload: video });
        }
        catch {
            history.push('/');
        }
    },
    getVideoByLink: (link: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const video = await httpClient.get<void, Video>({
                url: VideosPaths.byLink(link)
            } as IHttpClientRequestParameters<any>);
            const authState = getState().auth;
            if (video.createdBy?.id === authState?.userInfo?.id) {
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
            history.push('/');
        }
    },
    logVideoAction: (): AppThunkAction<KnownAction> => async (_dispatch, getState) => {
        try {
            const state = getState();
            const videoWatchState = state.videoWatch;
            const authState = state.auth;
            await httpClient.post<LogVideoAction, void>({
                url: VideosPaths.logVideoAction,
                payload: {
                    userId: authState?.userInfo?.id,
                    videoId: videoWatchState!.video!.id,
                    userActionType: UserActionType.View
                }
            });
        }
        catch {
        }
    }
};