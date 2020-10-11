export interface FolderVm {
    id: number;
    name: string;
    filesCount: number;
}

export interface CreateFolderVm {
    name: string;
    parentFolderId?: number;
    folderType: FolderType
}

export interface UpdateFolderVm extends FolderVm {
    id: number;
    name: string;
}

export enum FolderType {
    Public = 1,
    Private = 2
}