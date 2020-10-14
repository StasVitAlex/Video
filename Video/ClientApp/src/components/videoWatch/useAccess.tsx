import { AuthState } from "components/auth/Auth.reducer";
import { AccessType } from "models/Video";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { ApplicationState } from "store";
import { VideoWatchState } from "./VideoWatch.reducer";

export function useAccess() {
    const [hasAccessToComments, setHasAccessToComments] = useState(false);
    const store = useStore();
    const authState: AuthState = useSelector<ApplicationState, any>((state) => state.auth);
    const videoWatchState: VideoWatchState = useSelector<ApplicationState, any>((state) => state.videoWatch);

    const hasAccess = useCallback((accesType: AccessType): boolean => {
        // video owner
        if (authState?.userInfo?.id === videoWatchState.video?.createdBy.id) {
            return true;
        }

        if (accesType === AccessType.Everyone) {
            return true;
        }

        if (accesType === AccessType.SignedInUsers) {
            return authState?.userInfo ? true : false;
        }

        return false;
    }, [authState?.userInfo, videoWatchState.video?.createdBy.id]);

    useEffect(() => {
        if (videoWatchState.video) {
            const accesType = videoWatchState.video.commentsAccessType;
            if (hasAccess(accesType)) {
                setHasAccessToComments(true);
            }
        }
    }, [hasAccess, videoWatchState.video]);

    return hasAccessToComments;
}