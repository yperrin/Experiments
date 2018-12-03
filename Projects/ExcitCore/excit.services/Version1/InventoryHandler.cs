using ASI.Contracts.Excit.Inventory.Version1;
using excit.common.service;
using Lamar;
using log4net;
using System;
using System.Linq;
using System.Diagnostics;
using System.Threading.Tasks;
using ASI.Contracts.Excit;

namespace excit.services.Version1
{
    public class InventoryHandler
    {
        private static ILog _log = LogManager.GetLogger(typeof(InventoryHandler));
        ConfigurationRepository _configurationRepository;
        EventService _eventService;
        public InventoryHandler(ConfigurationRepository configurationRepository, EventService eventService)
        {
            _configurationRepository = configurationRepository;
            _eventService = eventService;
        }

        public async Task<Output> Process(IServiceContext serviceContext, InputByProduct input)
        {
            var start = DateTime.Now;
            var stopwatch = Stopwatch.StartNew();
            _log.Info("ProcessRequest - Start" + (input != null && !string.IsNullOrEmpty(input.CorrelationIdentifier) ? " - " + input.CorrelationIdentifier : string.Empty));
            var apiEvent = new ApiEvent()
            {
                Input = input,
                Api = "Inventory",
                Type = "Start",
                CreatedDateTime = start,
            };
            await _eventService.SendInventoryEvent(apiEvent).ConfigureAwait(false);
            try
            {
                if (input == null)
                    throw new Exception("You must provide an input");
                if (input.Company == null) throw new Exception("The company cannot be null");
                var supplier = await _configurationRepository.Get(input.Company.CompanyId).ConfigureAwait(false);
                var supplierApi = supplier.Apis.FirstOrDefault(api => api.Name == "Inventory");
                if (supplier == null || supplierApi == null || string.IsNullOrEmpty(supplierApi.Implementation))
                    throw new Exception("Could not find the configuration");
                if (input.Company.CompanyId == 0) input.Company.CompanyId = Int32.Parse(supplier.Id);
                var implementation = serviceContext.TryGetInstance<asi.excit.common.Interfaces.version1.IInventory>(supplierApi.Implementation);
                if (implementation == null) throw new Exception("Could not find the implementation for '" + supplierApi.Implementation + "'");
                if (!implementation.IsSupported) throw new Exception("The implementation is no longer valid '" + supplierApi.Implementation + "'");
                if ((input.UserCredentials == null || string.IsNullOrEmpty(input.UserCredentials.Username)) && supplierApi.DefaultCredentials != null)
                {
                    //we don't have credentials, use the default ones
                    input.UserCredentials = new User { Username = supplierApi.DefaultCredentials.Username, Password = supplierApi.DefaultCredentials.Password, AccountNumber = supplierApi.DefaultCredentials.Email };
                }
                if (input.UserCredentials == null) input.UserCredentials = new User();
                apiEvent.Output = await (implementation.GetByProductAsync((InputByProduct)input, supplier).ConfigureAwait(false));
                //apiEvent.Output.IsValid = IsValidInventory(output, supplier, System.Configuration.ConfigurationManager.AppSettings[InvalidValuesForInventory]);
                stopwatch.Stop();
                apiEvent.Type = "End";
                apiEvent.Output.OverallTimings = Math.Round(stopwatch.Elapsed.TotalMilliseconds, 0);
                apiEvent.Output.SupplierTimings = Math.Round(apiEvent.Output.SupplierTimings, 0);
                apiEvent.CreatedDateTime = DateTime.Now;
                await _eventService.SendInventoryEvent(apiEvent).ConfigureAwait(false);
                _log.Info("Get - End - " + stopwatch.Elapsed + (input != null && !string.IsNullOrEmpty(input.CorrelationIdentifier) ? " - " + input.CorrelationIdentifier : string.Empty));
                return (Output)apiEvent.Output;
            }
            catch (Exception ex)
            {
                apiEvent.Type = "Error";
                apiEvent.CreatedDateTime = DateTime.Now;
                apiEvent.ExceptionMessage = ex.Message;
                apiEvent.ExceptionStackTrace = ex.StackTrace;
                await _eventService.SendInventoryEvent(apiEvent).ConfigureAwait(false);
                throw;
            }
        }
    }
}
