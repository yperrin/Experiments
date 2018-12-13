using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace excit.common.service
{
    public class SomeEvent : INotification
    {
        public SomeEvent(string message)
        {
            Message = message;
        }

        public string Message { get; }
    }
    public class Handler1 : INotificationHandler<SomeEvent>
    {
        private readonly ILogger _logger;

        public Handler1(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(typeof(Handler1));
        }
        public async Task Handle(SomeEvent notification, CancellationToken cancellationToken)
        {
            await Task.Factory.StartNew( () =>_logger.LogWarning($"Handled: {notification.Message}"));
        }
    }
    public class Handler2 : INotificationHandler<SomeEvent>
    {
        private readonly ILogger _logger;

        public Handler2(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(typeof(Handler2));
        }
        public async Task Handle(SomeEvent notification, CancellationToken cancellationToken)
        {
            await Task.Factory.StartNew(() => _logger.LogWarning($"Handled: {notification.Message}"));
        }
    }
}
