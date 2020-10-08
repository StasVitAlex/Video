namespace Video.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.ViewModels.Video;

    public interface IVideoService
    {
        Task<List<VideoVm>> GetVideosFromFolder(int userId, int folderId);
        Task<VideoVm> GetVideoById(int userId, int videoId);
        Task<int> CreateVideo(CreateVideoVm model);
        Task LogVideoView(int? userId, int videoId);
        Task<VideoVm> GetVideoByLink(int? userId, string link);
    }
}