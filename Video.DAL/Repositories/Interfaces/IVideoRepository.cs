namespace Video.DAL.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.Dto.Video;

    public interface IVideoRepository
    {
        Task<IEnumerable<VideoDto>> GetVideosFromFolder(int userId, int folderId);
        Task<VideoDto> GetVideoById(int videoId);
        Task<VideoDto> GetVideoByLink(string link);
        Task<int> CreateVideo(CreateVideoDto model);
        Task LogVideoView(int? userId, int videoId);
        Task<bool> IsUserHasAccessToVideo(int userId, int videoId);
    }
}