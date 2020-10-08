namespace Video.BL.Services.Implementation
{
    using DAL.Repositories.Interfaces;
    using Interfaces;

    public class VideoService : IVideoService
    {
        private readonly IVideoRepository _videoRepository;

        public VideoService(IVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }
    }
}