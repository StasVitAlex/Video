namespace Video.DAL.Repositories.Implementation
{
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;

    public class CommentsRepository : BaseRepository, ICommentsRepository
    {
        public CommentsRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }
    }
}