export class VideosPaths {
    static byFolder(folderId: number, isArchived:boolean): string { return `video/by_folder/${folderId}?IsArchived=${isArchived}`; }
    static archive(folderId: number): string { return `video/${folderId}`; }
    static uploadVideo(folderId: number): string {
        return `video/upload_video/${folderId}`;
    }
}