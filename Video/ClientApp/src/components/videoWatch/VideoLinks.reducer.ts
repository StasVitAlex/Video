import {Action, Reducer} from 'redux';
import { addItemInArray, updateObject } from 'utils/utils';
import {KnownAction, KnownActionType} from './VideoWatch.actions';
import { Video } from 'models/Video';

export interface VideoLinksState {
    videoToCheckAccess: Video | undefined,
    availalbeLinks: Array<string>
}

const defaultState = {
    videoToCheckAccess: undefined,
    availalbeLinks: []
} as VideoLinksState;

export const reducer: Reducer<VideoLinksState> = (state: VideoLinksState | undefined, incomingAction: Action): VideoLinksState => {
    if (state === undefined) {
        return defaultState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetVideo:
            return updateObject<VideoLinksState>(state,
                { videoToCheckAccess: action.payload, });
        case KnownActionType.SetVideoAccess:
            const availableLinks = addItemInArray<string>(state.availalbeLinks,
                state.videoToCheckAccess!.linkCode);
            return updateObject<VideoLinksState>(state, { availableLinks });
        default:
            return state;
    }
};
