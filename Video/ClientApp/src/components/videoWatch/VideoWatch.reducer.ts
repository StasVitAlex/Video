import { Video } from 'models/Video';
import {Action, Reducer} from 'redux';
import { updateObject } from 'utils/utils';
import {KnownAction, KnownActionType} from './VideoWatch.actions';

export interface VideoWatchState {
    video: Video | undefined;
    checkVideoPassword: boolean
}

const defaultState = {
    video: undefined,
    checkVideoPassword: false
} as VideoWatchState;

export const reducer: Reducer<VideoWatchState> = (state: VideoWatchState | undefined, incomingAction: Action): VideoWatchState => {
    if (state === undefined) {
        return defaultState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetVideo:
            const video = updateObject<Video | undefined>(state.video, action.payload);
            return updateObject<VideoWatchState>(state, { video });
        default:
            return state;
    }
};
