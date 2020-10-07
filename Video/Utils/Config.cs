namespace Video.Utils
{
    using System.IO;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Hosting;

    public static class Config
    {
        public static IConfigurationRoot GetConfig(IHostingEnvironment env)
        {
            if (string.IsNullOrEmpty(env.EnvironmentName))
                env.ApplicationName = "local";

            var baseDirectory = Directory.GetCurrentDirectory();
            var builder = new ConfigurationBuilder().SetBasePath(baseDirectory);
            builder = builder.AddJsonFile(Path.Combine(baseDirectory, "Configuration", $"appsettings.{env.EnvironmentName.ToLower()}.json"), false, true);
            builder = builder.AddEnvironmentVariables();
            var config = builder.Build();
            return config;
        }
    }
}