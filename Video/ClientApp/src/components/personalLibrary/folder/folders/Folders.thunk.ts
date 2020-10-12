import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import {AppThunkAction} from "store";
import {KnownAction, KnownActionType} from "./Folders.actions";
import {FoldersPaths} from "./Folders.paths";
import {CreateFolderVm, FolderVm, UpdateFolderVm} from "../../../models/Folder";

export const actionCreators = {

    loadFolders: (parentFolderId: number, isArchived: boolean): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            if (!parentFolderId) {
                const rootFolder = await httpClient.get<FolderVm>({url: FoldersPaths.userRootFolder} as IHttpClientRequestParameters<any>);
                dispatch({type: KnownActionType.SetRootFolder, payload: rootFolder.id});
                parentFolderId = rootFolder.id;
            }
            dispatch({type: KnownActionType.SetCurrentFolder, payload: parentFolderId});
            const folders = await httpClient.get<FolderVm[]>({url: `${FoldersPaths.all}?IsArchived=${isArchived}&ParentFolderId=${parentFolderId}`} as IHttpClientRequestParameters<any>);
            dispatch({type: KnownActionType.SetFolders, payload: folders});
        } catch (e) {

        }
    },

    getUserRootFolder: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const folder = await httpClient.get<FolderVm>({url: FoldersPaths.userRootFolder} as IHttpClientRequestParameters<any>);
        dispatch({type: KnownActionType.SetRootFolder, payload: folder.id});
    },

    createFolder: (model: CreateFolderVm): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const folderId = await httpClient.post<number>({url: FoldersPaths.create, payload: model} as IHttpClientRequestParameters<any>);
            dispatch({type: KnownActionType.CreateFolder, payload: Object.assign(model, {id: folderId, filesCount: 0})});
        } catch (e) {

        }
    },

    updateFolder: (model: UpdateFolderVm): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        await httpClient.put<number>({url: FoldersPaths.update, payload: model} as IHttpClientRequestParameters<any>);
        dispatch({type: KnownActionType.UpdateFolder, payload: model});
    },

    archiveFolder: (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        await httpClient.delete({url: `${FoldersPaths.delete}/${id}`} as IHttpClientRequestParameters<any>);
        dispatch({type: KnownActionType.DeleteFolder, payload: id});
    },

    setCurrentFolder: (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({type: KnownActionType.SetCurrentFolder, payload: id});
    },
};