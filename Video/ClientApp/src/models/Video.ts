import {VideoCreator} from "./VideoCreator";
import {UserActionType} from "./enums/UserActionType.enum";

export enum AccessType {
    None = 1,
    SignedInUsers = 2,
    Everyone = 3
}

export interface Video {
    id: number;
    title: string;
    extension: string;
    folderId: number;
    locationUrl: string;
    thumbnailUrl: string;
    createdDate: Date;
    uniqueViews: number;
    viewsCount: number;
    linkUrl: string;
    linkCode: string;
    linkPassword: string;
    expiryDate: Date;
    duration: number;
    commentsAccessType: AccessType;
    createdBy: VideoCreator
}


export interface VideoActivities {
    userId: number;
    firstName: string;
    lastName: string;
    imageThumbnailUrl: string;
    videoId: number;
    userActionType: UserActionType;
    actionDate: Date;
}