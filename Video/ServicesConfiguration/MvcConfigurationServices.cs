namespace Video.ServicesConfiguration
{
    using System.Linq;
    using System.Text.Json;
    using FluentValidation.AspNetCore;
    using FluentValidation.Attributes;
    using Microsoft.AspNetCore.Antiforgery;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.CookiePolicy;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.HttpOverrides;
    using Microsoft.AspNetCore.Mvc.Authorization;
    using Microsoft.AspNetCore.ResponseCompression;
    using Microsoft.Extensions.DependencyInjection;
    using Middleware;

    public static class MvcConfigurationServices
    {
        public static IServiceCollection ApplyMvcConfiguration(this IServiceCollection services)
        {
            services.AddResponseCompression(options =>
                {
                    options.Providers.Add<GzipCompressionProvider>();
                    options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[] {"text/json", "application/json", "text/plain"});
                })
                .AddMvc(config =>
                {
                    var policy = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .Build();
                    config.Filters.Add(new AuthorizeFilter(policy));
                    config.RespectBrowserAcceptHeader = true;
                })
                .AddFluentValidation(c => c.ValidatorFactoryType = typeof(AttributedValidatorFactory))
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.IgnoreNullValues = false;
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });
            services.Configure<ForwardedHeadersOptions>(options => { options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto; });
            return services;
        }

        public static IApplicationBuilder MvcBuild(this IApplicationBuilder app)
        {
            app.UseCookiePolicy()
                .UseSession()
                .UseCors("CorsPolicy")
                .UseCookiePolicy(new CookiePolicyOptions
                {
                    HttpOnly = HttpOnlyPolicy.Always
                })
                .UseForwardedHeaders(new ForwardedHeadersOptions
                {
                    ForwardedHeaders = ForwardedHeaders.All
                })
                .Use(async (context, next) =>
                {
                    var path = context.Request.Path.Value;
                    if (path != null)
                    {
                        var tokens = app.ApplicationServices.GetService<IAntiforgery>().GetAndStoreTokens(context);
                        context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions
                        {
                            Path = "/",
                            HttpOnly = true,
                        });
                    }

                    await next();
                })
                .UseResponseCompression();
            return app;
        }
    }
}