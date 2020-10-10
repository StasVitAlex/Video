export class FoldersPaths {
    static get all(): string {
        return 'folders';
    }

    static get userRootFolder(): string {
        return 'folders/user_root';
    }

    static get create(): string {
        return 'folders';
    }

    static get update(): string {
        return 'folders';
    }

    static get delete(): string {
        return 'folders';
    }

    static uploadVideo(folderId: number): string {
        return `video/upload_video/${folderId}`;
    }
}