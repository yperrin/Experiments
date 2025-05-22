using excit.common.model;
using excit.common.service;
using Lamar;

namespace excit.common
{
    public static class IocConfiguration
    {
        public static void ConfigureContainer(ApplicationSettings applicationSettings, ServiceRegistry services)
        {
            services.For<CacheConfigurationRepository>()
                .Add<CacheConfigurationRepository>()
                .Ctor<string>("redisConnectionString").Is(applicationSettings.RedisconnectionString)
                .Ctor<string>("redisPassword").Is(applicationSettings.RedisPassword)
                .Ctor<string>("databaseConnectionString").Is(applicationSettings.ConfigurationConnectionString)
                .Ctor<string>("databaseName").Is("excit");

            services.For<ConfigurationRepository>()
                .Add<ConfigurationRepository>()
                .Ctor<string>("connectionString").Is(applicationSettings.ConfigurationConnectionString)
                .Ctor<string>("databaseName").Is("excit");

            services.For<EventService>()
                .Add<EventService>()
                .Ctor<string>("connectionString").Is(applicationSettings.EventHubConnectionString)
                .Ctor<string>("eventHubName").Is("api-events");

            services.For<asi.excit.common.Interfaces.version1.IInventory>()
                .Use<Integration.PromoStandards.Inventoryv100>()
                .Named("PromoStandardsInventory v1.2.1")
                .Ctor<string>("version").Is("1.2.1");
        }
    }
}
