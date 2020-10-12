import {Action, Reducer} from 'redux';
import {FolderVm} from "models/Folder";
import {KnownAction, KnownActionType} from "./Folders.actions";

export interface FoldersState {
    folders: FolderVm[];
    rootFolderId: number;
    currentFolderId: number;
}

export const reducer: Reducer<FoldersState> = (state: FoldersState | undefined, incomingAction: Action): FoldersState => {
    if (state === undefined) {
        return {folders: [], rootFolderId: 0, currentFolderId: 0};
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case KnownActionType.SetFolders:
            return {...state, folders: action.payload};
        case KnownActionType.CreateFolder:
            return {...state, folders: state.folders.concat([action.payload])};
        case KnownActionType.UpdateFolder:
            const index = state.folders.findIndex(p => p.id === action.payload.id);
            if (index >= 0) {
                const updatedFolders = state.folders;
                updatedFolders[index] = { ...action.payload };
                return Object.assign(state, {folders: updatedFolders});
            }
            return {...state, folders: state.folders};
        case KnownActionType.DeleteFolder:
            return {...state, folders: state.folders.filter(p => p.id !== action.payload)};
        case KnownActionType.SetRootFolder:
            return {...state, rootFolderId: action.payload};
        case KnownActionType.SetCurrentFolder:
            return {...state, currentFolderId: action.payload};
        default:
            return state;
    }
};
