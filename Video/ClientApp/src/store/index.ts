import * as Auth from 'components/auth/Auth.reducer';

// The top-level state object
export interface ApplicationState {
    auth: Auth.AuthState | undefined
}

export const reducers = {
    auth: Auth.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
