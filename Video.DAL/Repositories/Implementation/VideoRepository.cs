namespace Video.DAL.Repositories.Implementation
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Models.Dto.Video;

    public class VideoRepository : BaseRepository, IVideoRepository
    {
        public VideoRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }

        public async Task<IEnumerable<VideoDto>> GetVideosFromFolder(int userId, int folderId)
        {
            return new List<VideoDto>();
        }

        public async Task<VideoDto> GetVideoById(int videoId)
        {
            return new VideoDto();
        }

        public async Task<VideoDto> GetVideoByLink(string link)
        {
            return new VideoDto();
        }

        public async Task<int> CreateVideo(CreateVideoDto model)
        {
            return 1;
        }

        public async Task LogVideoView(int? userId, int videoId)
        {
        }

        public async Task<bool> IsUserHasAccessToVideo(int userId, int videoId)
        {
            return true;
        }
    }
}