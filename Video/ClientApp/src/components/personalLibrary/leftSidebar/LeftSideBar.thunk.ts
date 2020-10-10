import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import { FoldersPaths } from "../folder/folders/Folders.paths";
import { history } from "index";
import { AppThunkAction } from "store";

export const actionCreators = {
    uploadVideo: (folderId: number, file: File): AppThunkAction<void> => async (dispatch, getState) => {
        try {
            const formData = new FormData();
            formData.append(
                "file",
                file,
                file.name
            );
            const videoId = await httpClient.post<any, number>({
                url: FoldersPaths.uploadVideo(folderId),
                payload: formData
            } as IHttpClientRequestParameters<any>);
            history.push(`/video/${videoId}`);
        }
        catch {
        }
    }
};