import * as Auth from 'components/auth/Auth.reducer';
import * as Folders from "components/personalLibrary/folder/folders/Folders.reducer";
import * as VideoWatch from "components/videoWatch/VideoWatch.reducer";


// The top-level state object
export interface ApplicationState {
    auth: Auth.AuthState | undefined,
    folders: Folders.FoldersState | undefined,
    videoWatch: VideoWatch.VideoWatchState | undefined,
}

export const reducers = {
    auth: Auth.reducer,
    folders: Folders.reducer,
    videoWatch: VideoWatch.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
