namespace Video.ServicesConfiguration
{
    using System;
    using System.Text;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.DataProtection;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Http.Features;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.IdentityModel.Tokens;
    using IConfigurationRoot = Microsoft.Extensions.Configuration.IConfigurationRoot;

    public static class SecurityConfigurationServices
    {
        public static IServiceCollection ApplySecurityConfiguration(this IServiceCollection services, IConfigurationRoot Configuration, IHostingEnvironment environment)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddLogging(
                builder =>
                {
                    builder.AddFilter("Microsoft", Microsoft.Extensions.Logging.LogLevel.Warning)
                        .AddFilter("System", Microsoft.Extensions.Logging.LogLevel.Warning)
                        .AddFilter("NToastNotify", Microsoft.Extensions.Logging.LogLevel.Warning)
                        .AddConsole();
                });
            services.AddCors(options =>
            {
                options.AddPolicy(
                    "CorsPolicy",
                    bld => bld
                        //.WithOrigins(Configuration.GetSection("CommonSettings:CorsOriginsWhiteList").Value.Split(" "))
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddDataProtection()
                .SetApplicationName("Video")
                .DisableAutomaticKeyGeneration();

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;

                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = Configuration.GetSection("Token:Issuer").Value,
                    ValidAudience = Configuration.GetSection("Token:Audience").Value,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Token:Key").Value))
                };
            }).AddCookie();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromDays(1);
                options.IOTimeout = TimeSpan.FromDays(1);
            });
            services.AddDistributedMemoryCache();
            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue;
            });
            return services;
        }
    }
}