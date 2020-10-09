export enum VideoAccessType {
    None = 1,
    SignedInUsers = 2,
    Everyone = 3
}

export interface Video {
    id: number;
    fileName: string;
    folderId: number;
    link: string;
    userId: number;
    extension: string;
    createdDate: Date;
    viewsCount: number;
    expiryDate: Date;
    videoAccessType: VideoAccessType;
}
