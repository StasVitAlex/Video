namespace Video.ServicesConfiguration
{
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Models.Configuration;

    public static class AppConfigurationServices
    {
        public static IServiceCollection ApplyAppConfigurationFile(this IServiceCollection services, IConfigurationRoot Configuration)
        {
            services.Configure<TokenConfiguration>(Configuration.GetSection("Token"));
            services.Configure<SmtpSettings>(Configuration.GetSection("SmtpSettings"));
            services.Configure<CommonSettings>(Configuration.GetSection("CommonSettings"));
            services.Configure<DatabaseConfiguration>(Configuration.GetSection("Database"));

            //services.AddHostedService<QueueHostedService>();

            return services;
        }
    }
}