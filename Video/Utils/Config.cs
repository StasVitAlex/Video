namespace Video.Utils
{
    using System.IO;
    using Microsoft.Extensions.Configuration;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;

    public static class Config
    {
        public static IConfigurationRoot GetConfig(IWebHostEnvironment env)
        {
            if (string.IsNullOrEmpty(env.EnvironmentName))
                env.ApplicationName = "local";

            var baseDirectory = Directory.GetCurrentDirectory();
            var builder = new ConfigurationBuilder().SetBasePath(env.ContentRootPath);
            builder = builder
                .AddJsonFile(Path.Combine(baseDirectory, "Configuration", $"appsettings.{env.EnvironmentName.ToLower()}.json"), false, true)
                .AddEnvironmentVariables();
            if (env.IsDevelopment())
            {
                builder = builder.AddUserSecrets<Startup>();
            }

            return builder.Build();
        }
    }
}