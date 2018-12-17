using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ASI.Contracts.Excit.Inventory.Version1;
using asi.excit.common.Integration.PromoStandards;
using excit.common.model;
using ASI.Contracts.Excit;
using System.ServiceModel;
using InventoryPromoStandards.V1_2_1;
using System.Dynamic;

namespace excit.common.Integration.PromoStandards
{
    public class Inventoryv100 : BasePromostandardsInventory
    {
        private static readonly string[] _invalidValues = new string[] { "NONE", "NA", "Success", "null", "N/A" };////We are getting "null" as string in errormessage for GMG Pens supplier.
        private static string[] _errorMessages = new string[]
        {
            "[Microsoft][ODBC SQL Server Driver][SQL Server]String or binary data would be truncated.", //Error Message for AJM         
            "Server was unable to process request. ---> Object reference not set to an instance of an object."//Error Message for Nu Promo International
        };
        private readonly string _version;
        public string Version { get { return _version; } }
        public Inventoryv100(string version)
        {
            _version = version;
        }
        public override async Task<Output> GetByProductAsync(InputByProduct input, Supplier supplierConfiguration)
        {
            var start = DateTime.Now;
            var output = new Output
            {
                ProductQuantities = new List<ProductQuantities>()
            };
            //variable to host all the results from threads
            var productResponseCache = new ConcurrentDictionary<string, IList<SupplierQuantity>>();

            //iterate through each input product and get the inventory for each one
            var allProductNumbers = new List<string>();
            allProductNumbers.AddRange(GetProductNumbers(input.Products));
            //run inventory once
            if (allProductNumbers.Any())
            {
                _log.Info("GetByProduct - First Pass Starting all tasks");
                DateTime supplierStart = DateTime.Now;
                List<Task> tasks = new List<Task>();
                foreach(var productNumber in allProductNumbers)
                {
                    tasks.Add(GetDetailsTask(input.UserCredentials, supplierConfiguration, input.Company, productNumber, productResponseCache));
                }
                await Task.WhenAll(tasks.ToArray()).ConfigureAwait(false);
                DateTime supplierEnd = DateTime.Now;
                _log.Info("GetByProduct - First Pass Ending all tasks - " + (supplierEnd - supplierStart));
                output.SupplierTimings += Math.Round((supplierEnd - supplierStart).TotalMilliseconds, 0);
            }
            allProductNumbers.Clear();
            //check if we need to run the process one more time
            foreach (var product in input.Products)
            {
                if (!string.IsNullOrEmpty(product.Number) &&
                    product.Numbers != null && product.Numbers.Count > 1 && //there are other product numbers available
                    productResponseCache[product.Number].Count == 1 && //we only have one answer
                    (productResponseCache[product.Number].First().Label == "200: ProductID not found" || productResponseCache[product.Number].First().Label == "Invalid Item Number")) //the one answer is product not found
                {
                    //The product has invalid inventory and could potentially have better values
                    //remove from cache
                    IList<SupplierQuantity> value;
                    productResponseCache.TryRemove(product.Number, out value);
                    allProductNumbers.AddRange(product.Numbers.Where(nb => nb != product.Number));
                }
            }
            //run inventory again if we think we can get better results
            if (allProductNumbers.Any())
            {
                _log.Info("GetByProduct - Second Pass Starting all tasks");
                DateTime supplierStart = DateTime.Now;
                List<Task> tasks = new List<Task>();
                foreach (var productNumber in allProductNumbers)
                {
                    tasks.Add(GetDetailsTask(input.UserCredentials, supplierConfiguration, input.Company, productNumber, productResponseCache));
                }
                await Task.WhenAll(tasks.ToArray()).ConfigureAwait(false);
                DateTime supplierEnd = DateTime.Now;
                _log.Info("GetByProduct - Second Pass Ending all tasks - " + (supplierEnd - supplierStart));
                output.SupplierTimings += Math.Round((supplierEnd - supplierStart).TotalMilliseconds, 0);
            }
            BindOutput(productResponseCache, input.Products, output);
            _log.Info("GetByProduct - End - " + (DateTime.Now - start));
            return output;
        }

        protected async Task GetDetailsTask(User userCredentials, Supplier supplier, Company company, string productNumber, ConcurrentDictionary<string, IList<SupplierQuantity>> productResponseCache)
        {
            _log.Debug("GetDetailsTask - Start");
            DateTime start = DateTime.Now;
            double serverFilterTiming = 0;
            var properties = supplier.Apis.Where(api => api.Name == "Inventory").FirstOrDefault()?.Properties;
            bool combineWithMessage = properties.Any(cnfg => cnfg.Name != null && cnfg.Name == "IncludeMessage" && cnfg.Value == "true");
            var startServerFilter = DateTime.Now;
            var filterResponse = await GetFilterResponse(userCredentials, supplier, productNumber).ConfigureAwait(false);
            serverFilterTiming = (DateTime.Now - startServerFilter).TotalMilliseconds;
            var filterColor = filterResponse?.FilterColorArray;
            var filterSize = filterResponse?.FilterSizeArray;
            var filterSelection = filterResponse?.FilterSelectionArray;
            var isFilterError = filterResponse?.errorMessage;
            ServiceOutput response = new ServiceOutput();
            var quantities = new List<SupplierQuantity>();
            if (string.IsNullOrEmpty(isFilterError))
            {
                response = await GetDetails(userCredentials, supplier, company, productNumber, filterColor, filterSize, filterSelection).ConfigureAwait(false);
            }
            else
            {
                if (isFilterError != null && !_invalidValues.Contains(isFilterError))
                {
                    quantities.Add(new SupplierQuantity
                    {
                        Label = isFilterError
                    });
                }
            }
            response.timing += serverFilterTiming;
            _log.Debug("GetDetailsTask - Processing data - " + (DateTime.Now - start).TotalMilliseconds);
            if (isFilterError == null)
            {
                if (response.data == null || response.data.Reply == null)
                {
                    quantities.Add(new SupplierQuantity
                    {
                        Label = "No data was returned by the server"
                    });
                }
                else if (!string.IsNullOrEmpty(response.data.Reply.errorMessage) && !_invalidValues.Contains((string)response.data.Reply.errorMessage))
                {
                    quantities.Add(new SupplierQuantity
                    {
                        Label = response.data.Reply.errorMessage
                    });
                }
                else
                {
                    if (response.data.Reply.ProductVariationInventoryArray != null)
                    {
                        start = DateTime.Now;
                        _log.Info("GetDetailsTask - Processing ProductVariationInventoryArray - start");
                        foreach (var variationInventory in response.data.Reply.ProductVariationInventoryArray)
                        {
                            var supplierQuantity = new SupplierQuantity
                            {
                                Code = variationInventory.partID,
                            };
                            if (combineWithMessage)
                            {
                                var startTest = DateTime.Now;
                                StringBuilder quantity = new StringBuilder();
                                quantity.Append(variationInventory.quantityAvailable ?? string.Empty);
                                if (!string.IsNullOrEmpty(variationInventory.quantityAvailable) && !string.IsNullOrEmpty(variationInventory.customProductMessage)
                                    && !(variationInventory.quantityAvailable.Equals(variationInventory.customProductMessage, StringComparison.OrdinalIgnoreCase)))
                                {
                                    quantity.Append(" - ");
                                    quantity.Append(variationInventory.customProductMessage);
                                }
                                else if (string.IsNullOrEmpty(variationInventory.quantityAvailable) && !string.IsNullOrEmpty(variationInventory.customProductMessage))
                                {
                                    quantity.Append(variationInventory.customProductMessage);
                                }
                                supplierQuantity.Label = quantity.ToString();
                                var quantityValue = 0;
                                if (!string.IsNullOrEmpty(variationInventory.quantityAvailable))
                                    int.TryParse(variationInventory.quantityAvailable, out quantityValue);
                                supplierQuantity.Quantity = quantityValue;
                            }
                            else
                            {
                                supplierQuantity.Label = !string.IsNullOrEmpty(variationInventory.quantityAvailable) ? variationInventory.quantityAvailable : !string.IsNullOrEmpty(variationInventory.customProductMessage) ? variationInventory.customProductMessage : string.Empty;
                            }
                            StringBuilder description = new StringBuilder(variationInventory.partDescription != null && !_invalidValues.Contains((string)variationInventory.partDescription) ? variationInventory.partDescription : string.Empty);
                            var value = (string)variationInventory.attributeColor;
                            if (!string.IsNullOrEmpty(value) && !_invalidValues.Contains(value)) description.Append(" (Color ").Append(value).Append(")");
                            value = (string)variationInventory.attributeSize;
                            if (!string.IsNullOrEmpty(value) && !_invalidValues.Contains(value)) description.Append(" (Size ").Append(value).Append(")");
                            supplierQuantity.Description = description.ToString();
                            quantities.Add(supplierQuantity);
                        }
                        _log.Info("GetDetailsTask - Processing ProductVariationInventoryArray - end - " + (DateTime.Now - start).TotalMilliseconds);
                    }
                    if ((response.data.Reply.ProductVariationInventoryArray == null || response.data.Reply.ProductVariationInventoryArray.Length == 0) &&
                        response.data.Reply.ProductCompanionInventoryArray != null)
                    {
                        start = DateTime.Now;
                        _log.Info("GetDetailsTask - Processing ProductCompanionInventoryArray - start");
                        foreach (var companionInventory in response.data.Reply.ProductCompanionInventoryArray)
                        {
                            var supplierQuantity = new SupplierQuantity
                            {
                                Code = companionInventory.partID,
                            };
                            if (combineWithMessage)
                            {
                                StringBuilder quantity = new StringBuilder();
                                quantity.Append(companionInventory.quantityAvailable ?? string.Empty);
                                if (!string.IsNullOrEmpty(companionInventory.quantityAvailable) && !string.IsNullOrEmpty(companionInventory.customProductMessage) && !(companionInventory.quantityAvailable.Equals(companionInventory.customProductMessage, StringComparison.OrdinalIgnoreCase)))
                                {
                                    quantity.Append(" - ");
                                    quantity.Append(companionInventory.customProductMessage);
                                }
                                else if (string.IsNullOrEmpty(companionInventory.quantityAvailable) && !string.IsNullOrEmpty(companionInventory.customProductMessage))
                                {
                                    quantity.Append(companionInventory.customProductMessage);
                                }
                                supplierQuantity.Label = quantity.ToString();
                            }
                            else
                            {
                                supplierQuantity.Label = !string.IsNullOrEmpty(companionInventory.quantityAvailable) ? companionInventory.quantityAvailable : !string.IsNullOrEmpty(companionInventory.customProductMessage) ? companionInventory.customProductMessage : string.Empty;
                            }
                            StringBuilder description = new StringBuilder(companionInventory.partDescription);
                            var value = (string)companionInventory.attributeColor;
                            if (!string.IsNullOrEmpty(value) && !_invalidValues.Contains(value)) description.Append(" (Color ").Append(value).Append(")");
                            value = (string)companionInventory.attributeSize;
                            if (!string.IsNullOrEmpty(value) && !_invalidValues.Contains(value)) description.Append(" (Size ").Append(value).Append(")"); ;
                            supplierQuantity.Description = description.ToString();
                            quantities.Add(supplierQuantity);
                        }
                        _log.Info("GetDetailsTask - Processing ProductCompanionInventoryArray - end - " + (DateTime.Now - start).TotalMilliseconds);
                    }
                    if ((response.data.Reply.ProductVariationInventoryArray == null || response.data.Reply.ProductVariationInventoryArray.Length == 0) &&
                        (response.data.Reply.ProductCompanionInventoryArray == null || response.data.Reply.ProductCompanionInventoryArray.Length == 0))
                    {
                        quantities.Add(new SupplierQuantity
                        {
                            Label = "No inventory available for Product."
                        });
                    }
                }
            }
            //store supplier timings in the first quantity record
            if (quantities.Any()) quantities[0].SupplierTimings = response.timing;
            productResponseCache.TryAdd(productNumber, quantities);
            _log.Debug("GetDetailsTask - End");
        }

        private async Task<GetFilterValuesReply> GetFilterResponse(User userCredentials, Supplier supplier, string productNumber)
        {
            var properties = supplier.Apis.Where(api => api.Name == "Inventory").FirstOrDefault()?.Properties;
            bool hasFilter = properties.Any(cnfg => cnfg.Name != null && cnfg.Name == "UseFilter");
            bool useFilter = properties.Any(cnfg => cnfg.Name != null && cnfg.Name == "UseFilter" && cnfg.Value == "true");
            var filterValueResponse = new GetFilterValuesReply();
            if (useFilter)
            {
                var filterResponse = await GetFilterValues(userCredentials, supplier, productNumber).ConfigureAwait(false);
                if (filterResponse != null && string.IsNullOrEmpty(filterResponse.errorMessage))
                {

                    filterValueResponse.FilterColorArray = filterResponse?.FilterColorArray ?? new string[] { };
                    filterValueResponse.FilterSizeArray = filterResponse?.FilterSizeArray ?? new string[] { };
                    filterValueResponse.FilterSelectionArray = filterResponse?.FilterSelectionArray ?? new string[] { };
                }
                else
                {
                    filterValueResponse.errorMessage = filterResponse?.errorMessage;
                }
            }
            else if (hasFilter)
            {
                filterValueResponse.FilterColorArray = new string[] { };
                filterValueResponse.FilterSizeArray = new string[] { };
                filterValueResponse.FilterSelectionArray = new string[] { };
            }
            return filterValueResponse;
        }

        private async Task<ServiceOutput> GetDetails(User userCredentials, Supplier supplier, Company company, string productNumber, string[] filterColor, string[] filterSize, string[] filterSelection)
        {
            _log.Info("GetDetails - Start");
            var implementation = supplier.Apis.FirstOrDefault(api => api.Name == "Inventory");
            var binding = asi.excit.common.Model.Constant.getHttpBinding(implementation.Url);
            var address = new EndpointAddress(implementation.Url);
            dynamic service = null;
            dynamic request;
            //prepare the web request
            switch (_version)
            {
                case "1.0.0":
                    {
                        service = new InventoryPromoStandards.V1_2_1.InventoryServiceClient(binding, address);
                        request = new InventoryPromoStandards.V1_2_1.Request();
                        break;
                    }
                case "1.2.1":
                    {
                        service = new InventoryServiceClient(binding, address);
                        request = new Request();
                        request.FilterColorArray = filterColor;
                        request.FilterSizeArray = filterSize;
                        request.FilterSelectionArray = filterSelection;
                        break;
                    }
                default:
                    request = null;
                    throw new Exception("Invalid version for the promostandard inventory service '" + _version + "'");
            }
            request.wsVersion = _version;
            request.id = userCredentials.Username ?? string.Empty;
            request.password = userCredentials.Password ?? string.Empty;
            request.productID = productNumber;
            request.productIDtype = "Supplier";

            ServiceOutput result = new ServiceOutput();
            _log.Info("GetDetails - Calling Supplier API using Product Number: " + productNumber);
            try
            {
                var startSupplier = DateTime.Now;
                result.data = await service.getInventoryLevelsAsync(request).ConfigureAwait(false);
                var endSupplier = DateTime.Now;
                _log.Info("GetDetails - Called Supplier API - " + (endSupplier - startSupplier));
                result.timing = Math.Round((endSupplier - startSupplier).TotalMilliseconds, 0);
            }
            catch (Exception ex)
            {
                if ((ex.Message.Contains("Item not found with id:") || ex.Message.Contains("Product not exists")) || _errorMessages.Contains(ex.Message))
                {
                    result = SetServiceOutputError(ex.Message, result);
                }
                else
                {
                    _log.Error("Exception Occur : \n " + ex.Message + "\n" + ex.StackTrace);
                    throw;
                }
            }
            if (result.data == null || result.data.Reply == null)
            {
                _log.Error("Service did not return any value");
            }
            if (result.data != null && result.data.Reply != null && !string.IsNullOrEmpty(result.data.Reply.errorMessage)) _log.Error("Service failed to respond: " + result.data.Reply.errorMessage);
            _log.Info("GetDetails - End");
            return result;
        }

        private async Task<GetFilterValuesReply> GetFilterValues(User userCredentials, Supplier supplier, string productNumber)
        {
            var implementation = supplier.Apis.Where(api => api.Name == "Inventory").FirstOrDefault();
            var binding = asi.excit.common.Model.Constant.getHttpBinding(implementation.Url);
            var address = new EndpointAddress(implementation.Url);
            GetFilterValuesReply filterResponse = null;
            try
            {
                var service = new InventoryServiceClient(binding, address);
                var request = new GetFilterValuesRequest
                {
                    wsVersion = "1.2.1",
                    id = userCredentials.Username,
                    password = userCredentials.Password,
                    productIDtype = "supplier",
                    productID = productNumber,
                };
                var response = await service.getFilterValuesAsync(request).ConfigureAwait(false);
                filterResponse = response.GetFilterValuesReply;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Item not found with id:") || ex.Message.Contains("Product not exists"))
                {
                    filterResponse = new GetFilterValuesReply();
                    filterResponse.errorMessage = ex.Message;
                }
                else
                {
                    _log.Error("Exception Occur : \n " + ex.Message + "\n" + ex.StackTrace);
                    throw;
                }
            }
            return filterResponse;
        }

        private ServiceOutput SetServiceOutputError(string isFilterError, ServiceOutput response)
        {
            response.data = new ExpandoObject();
            response.data.Reply = new ExpandoObject();
            response.data.Reply.errorMessage = isFilterError;
            return response;
        }
    }
}
