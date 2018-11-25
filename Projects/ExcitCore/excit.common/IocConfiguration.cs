using excit.common.service;
using Lamar;

namespace excit.common
{
    public static class IocConfiguration
    {
        public static void ConfigureContainer(string connectionString, ServiceRegistry services)
        {
            services.For<ConfigurationRepository>()
                .Add<ConfigurationRepository>()
                .Ctor<string>("connectionString").Is(connectionString)
                .Ctor<string>("databaseName").Is("excit");

            services.For<asi.excit.common.Interfaces.version1.IInventory>()
                .Use<Integration.PromoStandards.Inventoryv100>()
                .Named("PromoStandardsInventory v1.2.1")
                .Ctor<string>("version").Is("1.2.1");
        }
    }
}
