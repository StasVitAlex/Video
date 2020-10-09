import * as Auth from 'components/auth/Auth.reducer';
import * as PersonalLibrary from "../components/personalLibrary/PersonalLibrary.reducer";

// The top-level state object
export interface ApplicationState {
    auth: Auth.AuthState | undefined,
    personalLibrary: PersonalLibrary.PersonalLibraryState | undefined
}

export const reducers = {
    auth: Auth.reducer,
    personalLibrary: PersonalLibrary.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
