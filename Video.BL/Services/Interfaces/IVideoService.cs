namespace Video.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.ViewModels.Video;
    using Models.ViewModels.Link;

    public interface IVideoService
    {
        Task<List<VideoVm>> GetVideosByFolder(int userId, long folderId,GetVideosVm model);
        Task<VideoVm> GetVideoById(int?  userId, long videoId);
        Task<long> CreateVideo(long userId, CreateVideoVm model, string basePath);
        Task LogVideoAction(LogVideoActionVm model);
        Task<VideoVm> GetVideoByLink(int? userId, string link);
        Task ArchiveVideo(long videoId, int userId);
        Task<List<VideoActivityVm>> GetVideoActivity(long videoId);
        Task<string> ShareVideoLink(int userId, CreateVideoLinkVm model);
        Task<bool> VideoExists(long videoId);
    }
}