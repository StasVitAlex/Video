import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import { FoldersPaths } from "../folder/folders/Folders.paths";
import { history } from "index";
import { AppThunkAction } from "store";
import { VideosPaths } from "../videos/Videos.paths";

export const actionCreators = {
    uploadVideo: (folderId: number, file: File): AppThunkAction<void> => async (_dispatch, _getState) => {
        try {
            const formData = new FormData();
            formData.append(
                "file",
                file,
                file.name
            );
            const id = await httpClient.post<any, number>({
                url: VideosPaths.uploadVideo(folderId),
                payload: formData
            } as IHttpClientRequestParameters<any>);
            history.push(`/video?id=${id}`);
        }
        catch {
        }
    }
};