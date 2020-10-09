export interface FolderVm {
    id: number;
    name: string;
    filesCount: number;
}

export interface CreateFolderVm {
    name: string;
}

export interface UpdateFolderVm extends FolderVm {
    id: number;
    name: string;
}