import { Video } from 'models/Video';
import {Action, Reducer} from 'redux';
import {KnownAction, KnownActionType} from './VideoWatch.actions';

export interface VideoWatchState {
    video: Video | undefined;
}

export const reducer: Reducer<VideoWatchState> = (state: VideoWatchState | undefined, incomingAction: Action): VideoWatchState => {
    if (state === undefined) {
        return {video: undefined};
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetVideo:
            return {video: action.payload};
        default:
            return state;
    }
};
