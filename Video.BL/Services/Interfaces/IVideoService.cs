namespace Video.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.ViewModels.Video;

    public interface IVideoService
    {
        Task<List<VideoVm>> GetVideosFromFolder(int userId, long folderId);
        Task<VideoVm> GetVideoById(int userId, long videoId);
        Task<long> CreateVideo(CreateVideoVm model);
        Task LogVideoAction(LogVideoActionVm model);
        Task<VideoVm> GetVideoByLink(int? userId, string link);
    }
}