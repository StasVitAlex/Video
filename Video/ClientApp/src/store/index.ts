import * as Auth from 'components/auth/AuthReducer';

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
