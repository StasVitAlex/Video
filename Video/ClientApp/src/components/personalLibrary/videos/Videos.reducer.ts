import {Video} from 'models/Video';
import {Action, Reducer} from 'redux';
import {KnownAction, KnownActionType} from './Videos.actions';

export interface VideosState {
    videos: Video[];
}

export const reducer: Reducer<VideosState> = (state: VideosState | undefined, incomingAction: Action): VideosState => {
    if (state === undefined) {
        return {videos: []};
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetFolderVideos:
            return {...state, videos: action.payload};
        case KnownActionType.ArchiveVideo:
            return {...state, videos: state.videos?.filter(p => p.id !== action.payload)};
        default:
            return state;
    }
};
