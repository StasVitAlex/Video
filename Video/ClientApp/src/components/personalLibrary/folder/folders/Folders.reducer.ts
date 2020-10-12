import {Action, Reducer} from 'redux';
import {FolderVm} from "models/Folder";
import {KnownAction, KnownActionType} from "./Folders.actions";

export interface FoldersState {
    folders: FolderVm[];
    rootFolderId: number;
    currentFolderId: number;
    previousFolderId: number;
    openingsHistory: FolderVm[];
}

export const reducer: Reducer<FoldersState> = (state: FoldersState | undefined, incomingAction: Action): FoldersState => {
    if (state === undefined) {
        return {folders: [], rootFolderId: 0, currentFolderId: 0, previousFolderId: 0, openingsHistory: []};
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
            let history = state.openingsHistory;
            const historyIndex = history.findIndex(p => p.id === action.payload);
            if (action.payload === state.rootFolderId) {
                history = [];
            } else {
                if (historyIndex >= 0) {
                    history.length = historyIndex + 1;
                } else {
                    const folder = state.folders.find(p => p.id === action.payload);
                    if (folder)
                        history.push(folder);
                }
            }
            return {...state, previousFolderId: state.currentFolderId !== 0 ? 0 : state.currentFolderId, openingsHistory: history, currentFolderId: action.payload};
        default:
            return state;
    }
};
