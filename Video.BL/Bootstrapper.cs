namespace Video.BL
{
    using System.IO;
    using System.Reflection;
    using DAL.Repositories.Implementation;
    using DAL.Repositories.Interfaces;
    using Microsoft.Extensions.DependencyInjection;
    using RazorLight;
    using Services.Implementation;
    using Services.Interfaces;

    public static class Bootstrapper
    {
        public static IServiceCollection Run(IServiceCollection serviceCollection)
        {
            return SetUpDI(serviceCollection);
        }

        private static IServiceCollection SetUpDI(IServiceCollection serviceCollection)
        {
            #region repositories

            serviceCollection.AddScoped<IUserRepository, UserRepository>();
            serviceCollection.AddScoped<IFoldersRepository, FoldersRepository>();
            serviceCollection.AddScoped<ICommentsRepository, CommentsRepository>();
            serviceCollection.AddScoped<INotificationsRepository, NotificationsRepository>();
            serviceCollection.AddScoped<IVideoRepository, VideoRepository>();
            serviceCollection.AddScoped<IILinkRepository, LinkRepository>();

            #endregion

            #region services

            serviceCollection.AddScoped<IUserService, UserService>();
            serviceCollection.AddScoped<IEmailService, EmailService>();
            serviceCollection.AddScoped<IFoldersService, FoldersService>();
            serviceCollection.AddScoped<ICommentsService, CommentsService>();
            serviceCollection.AddScoped<INotificationService, NotificationService>();
            serviceCollection.AddScoped<IVideoService, VideoService>();

            #endregion

            serviceCollection.AddSingleton(Automapper.Automapper.RegisterMapper());
            serviceCollection.AddSingleton(new RazorLightEngineBuilder()
                .UseFileSystemProject(Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "EmailTemplates"))
                .UseMemoryCachingProvider()
                .Build());

            return serviceCollection;
        }
    }
}