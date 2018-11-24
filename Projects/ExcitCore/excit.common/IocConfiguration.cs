using excit.common.service;
using Lamar;

namespace excit.common
{
    public static class IocConfiguration
    {
        public static void ConfigureContainer(ServiceRegistry services)
        {
            services.For<ConfigurationRepository>()
                .Add<ConfigurationRepository>()
                .Ctor<string>("connectionString").Is("mongodb://localhost:27017")
                .Ctor<string>("databaseName").Is("excit");

            services.For<asi.excit.common.Interfaces.version1.IInventory>()
                .Use<Integration.PromoStandards.Inventoryv100>()
                .Named("PromoStandardsInventory v1.2.1")
                .Ctor<string>("version").Is("1.2.1");
        }
    }
}
