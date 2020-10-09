import {FolderVm} from "../../models/Folder";

export type KnownAction = SetFolders | CreateFolder | UpdateFolder | DeleteFolder;

export enum KnownActionType {
    SetFolders = 'SET_FOLDERS',
    CreateFolder = 'CREATE_FOLDER',
    UpdateFolder = 'UPDATE_FOLDER',
    DeleteFolder = 'DELETE_FOLDER'
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

