namespace Video.BL.Services.Implementation
{
    using DAL.Repositories.Interfaces;
    using Interfaces;

    public class NotificationService : INotificationService
    {
        private readonly INotificationsRepository _notificationsRepository;

        public NotificationService(INotificationsRepository notificationsRepository)
        {
            _notificationsRepository = notificationsRepository;
        }
    }
}