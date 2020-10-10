import {Action, Reducer} from 'redux';
import {KnownAction, KnownActionType} from './PersonalLibrary.actions';
import {FolderVm} from "../../models/Folder";

export interface PersonalLibraryState {
    folders: FolderVm[];
    rootFolderId: number;
}

export const reducer: Reducer<PersonalLibraryState> = (state: PersonalLibraryState | undefined, incomingAction: Action): PersonalLibraryState => {
    if (state === undefined) {
        return {folders: [], rootFolderId: 0};
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetFolders:
            return Object.assign(state, {folders: action.payload});
        case KnownActionType.CreateFolder:
            return Object.assign(state, {folders: state.folders.concat([action.payload])});
        case KnownActionType.UpdateFolder:
            const index = state.folders.findIndex(p => p.id === action.payload.id);
            if (index >= 0) {
                const updatedFolders = state.folders;
                updatedFolders[index] = action.payload;
                return Object.assign(state, {folders: updatedFolders});
            }
            return Object.assign(state, {folders: state.folders});
        case KnownActionType.DeleteFolder:
            return Object.assign(state, {folders: state.folders.filter(p => p.id !== action.payload)});
        case KnownActionType.SetRootFolder:
            return Object.assign(state, {rootFolderId: action.payload});
        default:
            return state;
    }
};
