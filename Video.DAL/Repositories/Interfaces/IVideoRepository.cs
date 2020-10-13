namespace Video.DAL.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.Dto.Video;
    using Models.Enums;

    public interface IVideoRepository
    {
        Task<IEnumerable<VideoDto>> GetVideosFromFolder(int userId, long folderId);
        Task<VideoDto> GetVideoById(long videoId);
        Task<VideoDto> GetVideoByLink(string link);
        Task<long> CreateVideo(long userId, CreateVideoDto model);
        Task UpdateVideoUrls(UpdateVideoUrlsDto model);
        Task LogVideoAction(int? userId, long videoId, VideoActionType actionType);
        Task<bool> IsUserHasAccessToVideo(int userId, long videoId);
    }
}