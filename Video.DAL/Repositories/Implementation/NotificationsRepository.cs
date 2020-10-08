namespace Video.DAL.Repositories.Implementation
{
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;

    public class NotificationsRepository : BaseRepository, INotificationsRepository
    {
        public NotificationsRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }
    }
}