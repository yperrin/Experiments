using ASI.Contracts.Excit;
using Microsoft.Azure.EventHubs;
using System.Collections.Generic;
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
        }
        public async Task SendInventoryEvent(IEnumerable<ApiEvent> dataList)
        {
            List<EventData> eventDataList = new List<EventData>();
            foreach (var data in dataList)
                eventDataList.Add(new EventData(Encoding.UTF8.GetBytes(Newtonsoft.Json.JsonConvert.SerializeObject(data))));
            await _eventHubClient.SendAsync(eventDataList).ConfigureAwait(false);
        }
    }
}
