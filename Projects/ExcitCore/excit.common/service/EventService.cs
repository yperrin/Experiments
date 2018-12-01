using ASI.Contracts.Excit;
using Microsoft.Azure.EventHubs;
using System.Text;
using System.Threading.Tasks;

namespace excit.common.service
{
    public class EventService
    {
        private static EventHubClient _eventHubClient;
        public EventService(string connectionString, string eventHubName)
        {
            if (_eventHubClient == null)
            {
                var connectionStringBuilder = new EventHubsConnectionStringBuilder(connectionString)
                {
                    EntityPath = eventHubName
                };
                _eventHubClient = EventHubClient.CreateFromConnectionString(connectionStringBuilder.ToString());
            }
        }

        public async Task SendInventoryEvent(ApiEvent data)
        {
            await _eventHubClient.SendAsync(new EventData(Encoding.UTF8.GetBytes(Newtonsoft.Json.JsonConvert.SerializeObject(data)))).ConfigureAwait(false);
            if (data.Type == "End")
            {
                await _eventHubClient.CloseAsync().ConfigureAwait(false);
                _eventHubClient = null;
            }
        }
    }
}
