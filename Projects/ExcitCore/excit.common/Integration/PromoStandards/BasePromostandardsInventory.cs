using System.Collections.Generic;
using System.Linq;
using log4net;
using asi.excit.common.Interfaces.version1;
using ASI.Contracts.Excit.Inventory.Version1;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using System;
using ASI.EntityModel;
using excit.common.model;

namespace asi.excit.common.Integration.PromoStandards
{
    struct ServiceOutput
    {
        public dynamic data;
        public double timing;
    }
    public abstract class BasePromostandardsInventory : IInventory
    {
        protected static readonly ILog _log = LogManager.GetLogger(typeof(BasePromostandardsInventory));
        public bool IsSupported
        {
            get { return true; }
        }
        public virtual string[] RequiredProperties
        {
            get
            {
                return new string[] { ASI.Contracts.Excit.Supplier.Version1.Login.UsernameName, ASI.Contracts.Excit.Supplier.Version1.Login.PasswordName };
            }
        }

        protected static string[] loginErrorValues = new string[]
        {
            "password","credentials","user","failed","105","customerid","authentication","invalid login"
        };

        protected List<string> GetProductNumbers(List<Product> Products)
        {
            var allProductNumbers = new List<string>();
            foreach (var product in Products)
            {
                //if parent number is there use that
                if (!string.IsNullOrEmpty(product.Number) && !allProductNumbers.Contains(product.Number))
                {
                    allProductNumbers.Add(product.Number);
                }
                if (product.Numbers != null && product.Numbers.Any())
                {
                    //if no parent number, try to use what is available in child data
                    foreach (string number in product.Numbers)
                    {
                        if (!string.IsNullOrEmpty(number) && !allProductNumbers.Contains(number))
                        {
                            allProductNumbers.Add(number);
                        }
                    }
                }
            }
            return allProductNumbers;
        }

        protected List<string> GetProductNumbersBySku(List<Product> Products)
        {
            var allProductNumbers = new List<string>();
            foreach (var product in Products)
            {
                if (product.SKU != null && product.SKU.Any())
                {
                    foreach (var sku in product.SKU)
                    {
                        if (!string.IsNullOrEmpty(sku.SKU) && !allProductNumbers.Contains(sku.SKU))
                        {
                            allProductNumbers.Add(sku.SKU);
                        }
                    }
                }
                //if parent number is there use that
                allProductNumbers.AddRange(GetProductNumbers(Products));
            }
            return allProductNumbers;
        }

        protected void BindOutput(ConcurrentDictionary<string, IList<SupplierQuantity>> productResponseCache, List<Product> products, Output output)
        {
            _log.Info("BindOutput - start");
            var start = DateTime.Now;
            if (productResponseCache.Any())
            {
                output.SupplierTimings = 0;
                var productNumbers = new List<string>();
                //How ever we are getting the SKU i.e. GetProductNumbersBySku() but it won't be added SupplierQuantity if we don't have it response cache, as below we are validating before adding.
                productNumbers.AddRange(GetProductNumbersBySku(products));
                foreach (var product in products)
                {
                    var quantities = new List<SupplierQuantity>();
                    foreach (var number in productNumbers)
                    {
                        if (productResponseCache.ContainsKey(number)) quantities.AddRange(productResponseCache[number]);
                    }
                    _log.Info("BindOutput - Adding all values - start");
                    var outputQuantity = new ProductQuantities
                    {
                        ProductIdentifier = product.Number ?? product.Id.ToString(),
                        Quantities = new List<Quantity>()
                    };
                    foreach (var quantity in quantities)
                    {
                        outputQuantity.Quantities.Add(new Quantity
                        {
                            Label = quantity.Label,
                            Value = quantity.Quantity,
                            PartCode = quantity.Code,
                            PartDescription = quantity.Description,
                            Location = quantity.Location
                        });
                        output.SupplierTimings += quantity.SupplierTimings;
                    }
                    output.ProductQuantities.Add(outputQuantity);
                    _log.Info("BindOutput - Adding all values - end");
                }
            }
            else
            {
                foreach (var product in products)
                {
                    var outputQuantity = new ProductQuantities
                    {
                        ProductIdentifier = product.Id.ToString(),
                        Quantities = new List<Quantity>()
                    };
                    outputQuantity.Quantities.Add(new Quantity
                    {
                        Label = "Could not find the product number",
                    });
                    output.ProductQuantities.Add(outputQuantity);
                }
            }
            _log.Info("BindOutput - End - " + (DateTime.Now - start));
        }

        public abstract Task<Output> GetByProductAsync(InputByProduct input, Supplier supplierConfiguration);
    }
}
