import * as Auth from 'components/auth/Auth.reducer';
import * as Folders from "../components/folder/folders/Folders.reducer";

// The top-level state object
export interface ApplicationState {
    auth: Auth.AuthState | undefined,
    folders: Folders.FoldersState | undefined
}

export const reducers = {
    auth: Auth.reducer,
    folders: Folders.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
