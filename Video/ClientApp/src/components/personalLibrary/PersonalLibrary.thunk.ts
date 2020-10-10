import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import {AppThunkAction} from "store";
import {KnownAction, KnownActionType} from "./PersonalLibrary.actions";
import {PersonalLibraryPaths} from "./PersonalLibrary.paths";
import {CreateFolderVm, FolderVm, UpdateFolderVm} from "../../models/Folder";

export const actionCreators = {

    loadFolders: (parentFolderId: number, isArchived: boolean): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            if (!parentFolderId) {
                const rootFolder = await httpClient.get<FolderVm>({url: PersonalLibraryPaths.userRootFolder} as IHttpClientRequestParameters<any>);
                dispatch({type: KnownActionType.SetRootFolder, payload: rootFolder.id});
                parentFolderId = rootFolder.id;
            }
            const folders = await httpClient.get<FolderVm[]>({url: `${PersonalLibraryPaths.all}?IsArchived=${isArchived}&ParentFolderId=${parentFolderId}`} as IHttpClientRequestParameters<any>);
            dispatch({type: KnownActionType.SetFolders, payload: folders});
        } catch (e) {

        }
    },

    getUserRootFolder: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const folder = await httpClient.get<FolderVm>({url: PersonalLibraryPaths.userRootFolder} as IHttpClientRequestParameters<any>);
        dispatch({type: KnownActionType.SetRootFolder, payload: folder.id});
    },

    createFolder: (model: CreateFolderVm): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const folderId = await httpClient.post<number>({url: PersonalLibraryPaths.create, payload: model} as IHttpClientRequestParameters<any>);
        dispatch({type: KnownActionType.CreateFolder, payload: Object.assign(model, {id: folderId, filesCount: 0})});
    },

    updateFolder: (model: UpdateFolderVm): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        await httpClient.put<number>({url: PersonalLibraryPaths.update, payload: model} as IHttpClientRequestParameters<any>);
        dispatch({type: KnownActionType.UpdateFolder, payload: model});
    },

    deleteFolder: (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        await httpClient.delete({url: `${PersonalLibraryPaths.update}/${id}`} as IHttpClientRequestParameters<any>);
        dispatch({type: KnownActionType.DeleteFolder, payload: id});
    }
};