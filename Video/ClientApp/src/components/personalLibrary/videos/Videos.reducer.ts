import {Video, VideoActivity} from 'models/Video';
import {Action, Reducer} from 'redux';
import {KnownAction, KnownActionType} from './Videos.actions';

export interface VideosState {
    videos: Video[];
    videoActivities: VideoActivity[]
}

export const reducer: Reducer<VideosState> = (state: VideosState | undefined, incomingAction: Action): VideosState => {
    if (state === undefined) {
        return {videos: [], videoActivities: []};
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetFolderVideos:
            return {...state, videos: action.payload};
        case KnownActionType.SetVideoActivities:
            return {...state, videoActivities: action.payload};
        case KnownActionType.ArchiveVideo:
            return {...state, videos: state.videos?.filter(p => p.id !== action.payload)};
        default:
            return state;
    }
};
