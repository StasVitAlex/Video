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

            #endregion

            #region services

            serviceCollection.AddScoped<IUserService, UserService>();
            serviceCollection.AddScoped<IEmailService, EmailService>();

            #endregion

            serviceCollection.AddSingleton(Automapper.Automapper.RegisterMapper());
            // serviceCollection.AddSingleton(new RazorLightEngineBuilder()
            //     .UseFileSystemProject(Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "EmailTemplates"))
            //     .UseMemoryCachingProvider()
            //     .Build());

            return serviceCollection;
        }
    }
}