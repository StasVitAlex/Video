namespace Video.DAL.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.Dto.Video;
    using Models.Enums;

    public interface IVideoRepository
    {
        Task<IEnumerable<VideoDto>> GetVideosFromFolder(int userId, long folderId, bool isArchive);
        Task<VideoDto> GetVideoById(long videoId);
        Task<VideoDto> GetVideoByLink(string link);
        Task<LinkPermissionDto> GetVideoLinkPermission(long linkId, VideoPermissionType permissionType);
        Task<long> CreateVideo(long userId, CreateVideoDto model);
        Task UpdateVideoInfo(UpdateVideoInfoDto model);
        Task LogVideoAction(int? userId, long videoId, VideoActionType actionType);
        Task<bool> IsUserHasAccessToVideo(int userId, long videoId);
        Task ArchiveVideo(long videoId);
        Task<bool> IsUserVideoOwner(long videoId, int userId);
    }
}