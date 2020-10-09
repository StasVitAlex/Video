export interface FolderVm {
    id: number;
    name: string;
}

export interface CreateFolderVm {
    name: string;
}

export interface UpdateFolderVm extends FolderVm {

}