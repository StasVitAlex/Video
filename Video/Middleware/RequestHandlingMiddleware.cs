namespace Video.Middleware
{
    using System;
    using System.Diagnostics;
    using System.Net;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using Models.Exceptions;
    using Newtonsoft.Json;

    public class RequestHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestHandlingMiddleware> _log;

        public RequestHandlingMiddleware(RequestDelegate next,
            ILogger<RequestHandlingMiddleware> log)
        {
            _log = log;
            _next = next;
        }

        /// <summary>
        /// Invoke request
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            try
            {
                _log.LogInformation($"{DateTime.UtcNow} - Processing request {context.Request.Path}");
                await _next(context);
                stopwatch.Stop();
                _log.LogInformation($"{DateTime.UtcNow} - request {context.Request.Path} finished; Execution time - {stopwatch.ElapsedMilliseconds} ms");
            }
            catch (Exception ex)
            {
                stopwatch.Stop();
                _log.LogError($"{DateTime.UtcNow} - request {context.Request.Path} finished with error: {ex.Message}; Execution time - {stopwatch.ElapsedMilliseconds} ms; Stack:{ex.StackTrace}");
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var message = exception.Message;
            var logAction = true;
            switch (exception)
            {
                case ValidationException _:
                    code = HttpStatusCode.BadRequest;
                    break;
                case AccessDeniedException _:
                    code = HttpStatusCode.Forbidden;
                    break;
                case BadRequestException _:
                    code = HttpStatusCode.BadRequest;
                    break;
                case ServiceUnavailableException _:
                    code = HttpStatusCode.ServiceUnavailable;
                    break;
                case NotFoundException _:
                    code = HttpStatusCode.NotFound;
                    break;
            }

            var result = JsonConvert.SerializeObject(new {message = string.IsNullOrEmpty(message) ? exception.Message : message});
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) code;
            await context.Response.WriteAsync(result);
        }
    }
}