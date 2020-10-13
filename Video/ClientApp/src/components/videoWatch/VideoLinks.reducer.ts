import {Action, Reducer} from 'redux';
import { addItemInArray, updateObject } from 'utils/utils';
import {KnownAction, KnownActionType} from './VideoWatch.actions';

export interface VideoLinksState {
    availalbeLinks: Array<string>
}

const defaultState = {
    availalbeLinks: []
} as VideoLinksState;

export const reducer: Reducer<VideoLinksState> = (state: VideoLinksState | undefined, incomingAction: Action): VideoLinksState => {
    if (state === undefined) {
        return defaultState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetVideo:
            const availableLinks = addItemInArray<string>(state.availalbeLinks, action.payload.linkCode);
            return updateObject<VideoLinksState>(state, { availableLinks });
        default:
            return state;
    }
};
