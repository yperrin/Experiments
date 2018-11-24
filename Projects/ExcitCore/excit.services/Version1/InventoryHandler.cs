using ASI.Contracts.Excit.Inventory.Version1;
using excit.common.model;
using excit.common.service;
using Lamar;
using log4net;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using ASI.Contracts.Excit;

namespace excit.services.Version1
{
    public class InventoryHandler
    {
        private static ILog _log = LogManager.GetLogger(typeof(InventoryHandler));
        ConfigurationRepository _configurationRepository;
        public InventoryHandler(ConfigurationRepository configurationRepository)
        {
            _configurationRepository = configurationRepository;
        }

        public async Task<Output> Process(IServiceContext serviceContext, InputByProduct input)
        {
            Output output = null;
            var start = DateTime.Now;
            var stopwatch = Stopwatch.StartNew();
            _log.Info("ProcessRequest - Start" + (input != null && !string.IsNullOrEmpty(input.CorrelationIdentifier) ? " - " + input.CorrelationIdentifier : string.Empty));
            Exception capturedException = null;
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
                output = await (implementation.GetByProductAsync((InputByProduct)input, supplier).ConfigureAwait(false));
                //The output validate methods validate and sets IsValid property.                
                //output.IsValid = IsValidInventory(output, supplier, System.Configuration.ConfigurationManager.AppSettings[InvalidValuesForInventory]);
                if (!output.IsValid)
                {
                    //@todo invalid output
                }
            }
            catch (Exception ex)
            {
                capturedException = ex;
            }
            if (capturedException != null)
            {
                string exceptionMessage = capturedException.Message;
                //@todo monitor exceptions
            }
            stopwatch.Stop();
            output.OverallTimings = Math.Round(stopwatch.Elapsed.TotalMilliseconds, 0);
            output.SupplierTimings = Math.Round(output.SupplierTimings, 0);
            _log.Info("Get - End - " + stopwatch.Elapsed + (input != null && !string.IsNullOrEmpty(input.CorrelationIdentifier) ? " - " + input.CorrelationIdentifier : string.Empty));
            //@todo successfull call
            return output;
        }
    }
}
