import {FolderVm} from "models/Folder";

export type KnownAction = SetFolders | CreateFolder | UpdateFolder | DeleteFolder | SetRootFolder | SetCurrentFolder;

export enum KnownActionType {
    SetFolders = 'SET_FOLDERS',
    CreateFolder = 'CREATE_FOLDER',
    UpdateFolder = 'UPDATE_FOLDER',
    DeleteFolder = 'DELETE_FOLDER',
    SetRootFolder = 'SET_ROOT_FOLDER',
    SetCurrentFolder  = 'SET_CURRENT_FOLDER'
}

export interface SetFolders {
    type: KnownActionType.SetFolders,
    payload: FolderVm[]
}

export interface CreateFolder {
    type: KnownActionType.CreateFolder,
    payload: FolderVm
}

export interface UpdateFolder {
    type: KnownActionType.UpdateFolder,
    payload: FolderVm
}

export interface DeleteFolder {
    type: KnownActionType.DeleteFolder,
    payload: number
}

export interface SetRootFolder {
    type: KnownActionType.SetRootFolder,
    payload: number
}

export interface SetCurrentFolder {
    type: KnownActionType.SetCurrentFolder,
    payload: number
}

