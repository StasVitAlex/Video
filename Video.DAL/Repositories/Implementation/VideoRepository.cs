namespace Video.DAL.Repositories.Implementation
{
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;

    public class VideoRepository : BaseRepository, IVideoRepository
    {
        public VideoRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }
    }
}