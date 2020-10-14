export class VideosPaths {
    static byFolder(folderId: number, isArchived:boolean): string { return `video/by_folder/${folderId}?IsArchived=${isArchived}`; }
    static archive(videoId: number): string { return `video/${videoId}`; }
    static activity(videoId: number): string { return `video/activity/${videoId}`; }
    static uploadVideo(folderId: number): string {
        return `video/upload_video/${folderId}`;
    }
}