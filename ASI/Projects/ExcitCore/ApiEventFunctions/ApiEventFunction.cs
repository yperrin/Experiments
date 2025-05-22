using ASI.Contracts.Excit;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Text;

namespace ApiEventFunctions
{
    public static class ApiEventFunction
    {
        [FunctionName("ApiEventFunction")]
        public static void Run([EventHubTrigger("api-events", Connection = "hubConnectionString", ConsumerGroup = "serverless-group")]string apiEventMessage, ILogger log)
        {
            log.LogInformation($"C# Event Hub trigger function processed a message: {apiEventMessage}");
            var apiEvent = Newtonsoft.Json.JsonConvert.DeserializeObject<ApiEvent>(apiEventMessage);
            //send an event to time series
            var apiStatsEvent = new ApiStatsEvent
            {
                Api = apiEvent.Api,
                CreatedDateTime = apiEvent.CreatedDateTime,
                CorrelationIdentifier = apiEvent.Input.CorrelationIdentifier,
            };
            switch (apiEvent.Type)
            {
                case "Start":
                    apiStatsEvent.Type = "Call";
                    apiStatsEvent.Series.Add(new ApiStatsMeasurement { Name = "Overall Timing", Value = 1 });
                    break;
                case "End":
                    apiStatsEvent.Type = "Successful Call";
                    apiStatsEvent.Series.Add(new ApiStatsMeasurement { Name = "Overall Timing", Value = apiEvent.Output.OverallTimings });
                    apiStatsEvent.Series.Add(new ApiStatsMeasurement { Name = "Supplier Timing", Value = apiEvent.Output.SupplierTimings });
                    break;
                case "Error":
                    apiStatsEvent.Type = "Error Call";
                    apiStatsEvent.Series.Add(new ApiStatsMeasurement { Name = "Overall Timing", Value = 1 });
                    break;
                default:
                    throw new Exception("Not a valid event type");
            }
            var connectionStringBuilder = new EventHubsConnectionStringBuilder(Environment.GetEnvironmentVariable("STATS_EVENTHUB_CONNECTION_STRING", EnvironmentVariableTarget.Process))
            {
                EntityPath = "api-stats"
            };
            log.LogInformation($"C# Event Hub trigger stats event " + connectionStringBuilder.ToString());
            var eventHubClient = EventHubClient.CreateFromConnectionString(connectionStringBuilder.ToString());
            //eventHubClient.SendAsync(new EventData(Encoding.UTF8.GetBytes(Newtonsoft.Json.JsonConvert.SerializeObject(apiStatsEvent)))).Wait();
            //eventHubClient.CloseAsync().Wait();
            log.LogInformation($"C# Event Hub trigger stats event turned off");
            log.LogInformation($"C# Event Hub trigger function processed");
        }
        public static string GetEnvironmentVariable(string name)
        {
            return name + ": " +
                Environment.GetEnvironmentVariable(name, EnvironmentVariableTarget.Process);
        }
    }
}
