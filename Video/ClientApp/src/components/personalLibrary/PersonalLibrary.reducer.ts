import {Action, Reducer} from 'redux';
import {KnownAction, KnownActionType} from './PersonalLibrary.actions';
import {FolderVm} from "../../models/Folder";

export interface PersonalLibraryState {
    folders: FolderVm[];
}

export const reducer: Reducer<PersonalLibraryState> = (state: PersonalLibraryState | undefined, incomingAction: Action): PersonalLibraryState => {
    if (state === undefined) {
        return {folders: []};
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetFolders:
            return {folders: action.payload};
        case KnownActionType.CreateFolder:
            return {folders: state.folders.concat([action.payload])};
        case KnownActionType.UpdateFolder:
            const index = state.folders.findIndex(p => p.id === action.payload.id);
            if (index >= 0) {
                const updatedFolders = state.folders;
                updatedFolders[index] = action.payload;
                return {folders: updatedFolders};
            }
            return {folders: state.folders};
        case KnownActionType.DeleteFolder:
            return {folders: state.folders.filter(p => p.id !== action.payload)};
        default:
            return state;
    }
};
