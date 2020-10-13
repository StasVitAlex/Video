export enum AccessType {
    None = 1,
    SignedInUsers = 2,
    Everyone = 3
}

export interface Video {
    id: number;
    title: string;
    folderId: number;
    locationUrl: string;
    thumbnailUrl: string;
    createdBy: number;
    createdDate: Date;
    uniqueViews: number;
    viewsCount: number;
    linkUrl: string;
    linkCode: string;
    linkPassword: string;
    expiryDate: Date;
    duration: number;
    commentsAccessType: AccessType;
}
