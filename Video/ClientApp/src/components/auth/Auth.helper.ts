import { history, store } from "index";
import { KnownActionType } from "./Auth.actions";

export class AuthHelper {
    static get token(): string  | undefined {
        const state = store.getState().auth;
        return state.userInfo ?
            state.userInfo.token :
            undefined;
    }

    static logOut(): void {
        store.dispatch({ type: KnownActionType.LogOut });
        history.push('/signIn');
    }
}