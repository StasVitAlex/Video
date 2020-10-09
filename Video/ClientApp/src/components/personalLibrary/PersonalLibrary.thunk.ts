import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import {AppThunkAction} from "store";
import {KnownAction, KnownActionType} from "./PersonalLibrary.actions";
import {PersonalLibraryPaths} from "./PersonalLibrary.paths";
import {FolderVm} from "../../models/Folder";

export const actionCreators = {
    handleMicrosoftAuth: (accessToken: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const folders = await httpClient.get<FolderVm>({url: PersonalLibraryPaths.all} as IHttpClientRequestParameters<any>);
        //dispatch({type: KnownActionType.SetFolders, payload: folders});
    }
};