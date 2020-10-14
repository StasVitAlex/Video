import { VideoCreator } from "./VideoCreator";

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
