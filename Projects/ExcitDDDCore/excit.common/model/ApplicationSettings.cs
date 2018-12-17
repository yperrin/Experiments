namespace excit.common.model
{
    public class ApplicationSettings
    {
        public string ConfigurationConnectionString { get; set; }
        public string EventHubConnectionString { get; set; }
        public string RedisconnectionString { get; set; }
        public string RedisPassword { get; set; }
    }
}
