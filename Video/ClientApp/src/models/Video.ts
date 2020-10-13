export enum AccessType {
    None = 1,
    SignedInUsers = 2,
    Everyone = 3
}

export interface Video {
    id: number;
    fileName: string;
    folderId: number;
    locationUrl: string;
    thumbnailUrl: string;
    userId: number;
    createdDate: Date;
    uniqueViews: number;
    viewsCount: number;
    expiryDate: Date;
    videoAccessType: AccessType;
}
