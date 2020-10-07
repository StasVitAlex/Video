namespace Video.ServicesConfiguration
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.OpenApi.Models;
    using Swashbuckle.AspNetCore.SwaggerGen;
    using Swashbuckle.AspNetCore.SwaggerUI;

    public class SwaggerDocumentFilter : IDocumentFilter
    {
        private readonly IServiceProvider _provider;

        public SwaggerDocumentFilter(IServiceProvider provider)
        {
            this._provider = provider ?? throw new ArgumentNullException(nameof(provider));
        }

        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            var http = this._provider.GetRequiredService<IHttpContextAccessor>();
            var isAuth = http.HttpContext.User.Identity.IsAuthenticated;
            foreach (var description in context.ApiDescriptions)
            {
                // var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                // if (env.ToLower() != "local")
                // {
                //     description.RelativePath = $"api/{description.RelativePath}";
                // }
                //var allowAnonymous = description.ActionDescriptor.EndpointMetadata.FirstOrDefault(p => p is AllowAnonymousAttribute);

                // if (allowAnonymous == null && !isAuth)
                // {
                //     var route = "/" + description.RelativePath.TrimEnd('/');
                //     swaggerDoc.Paths.Remove(route);
                // }
            }
        }
    }

    public static class SwaggerConfigurationServices
    {
        public static IServiceCollection ApplySwaggerConfiguration(this IServiceCollection services, IConfigurationRoot Configuration)
        {
            services.AddSwaggerGen(c =>
            {
                //c.EnableAnnotations();
                c.SwaggerDoc($"v1", new OpenApiInfo {Title = "Video api", Version = $"v1"});
                c.AddSecurityDefinition("bearer",
                    new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Please enter JWT with Bearer into field",
                        Name = "Authorization",
                        Type = SecuritySchemeType.ApiKey
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference {Type = ReferenceType.SecurityScheme, Id = "bearer"}
                        },
                        new[] {"readAccess", "writeAccess"}
                    }
                });
                var filePath = Path.Combine(AppContext.BaseDirectory, "Video.xml");
                c.IncludeXmlComments(filePath);
                c.DocumentFilter<SwaggerDocumentFilter>();
            });
            return services;
        }

        public static IApplicationBuilder SwaggerBuild(this IApplicationBuilder app, IConfigurationRoot Configuration)
        {
            app.UseSwagger(c =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                var isLocal = env.ToLower() == "local";
                var prefix = isLocal ? string.Empty : "/api";
                var http = isLocal ? "http" : "https";
                c.PreSerializeFilters.Add((swagger, httpReq) => { swagger.Servers = new List<OpenApiServer> {new OpenApiServer {Url = $"{http}://{httpReq.Host.Value}{prefix}"}}; });
            });
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"./v1/swagger.json", "Video api");
                c.DocumentTitle = "Video documentation";
                c.DocExpansion(DocExpansion.None);
            });
            return app;
        }
    }
}