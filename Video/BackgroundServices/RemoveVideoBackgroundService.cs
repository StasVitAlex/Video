namespace Video.BackgroundServices
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;

    public class RemoveVideoBackgroundService : BackgroundService
    {
        private readonly ILogger<RemoveVideoBackgroundService> _logger;

        public RemoveVideoBackgroundService(
            ILogger<RemoveVideoBackgroundService> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Run background item");
                    await Task.Delay(60000, cancellationToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, ex.Message);
                }
            }
        }
    }
}