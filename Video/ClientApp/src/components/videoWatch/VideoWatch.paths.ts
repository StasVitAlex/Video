export class VideoWatchPaths {
    static byLink(link: string): string { return `video/by_link/${link}`; }
    static get logVideoAction(): string { return 'video/log_action'; }
}