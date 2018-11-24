using System.Collections.Generic;

namespace ASI.Contracts.Excit.Supplier.Version1
{
    /// <summary>
    /// Options for the order creation functionality
    /// </summary>
    public class Order
    {
        public static readonly string PONumberName = "Order.Number";
        public static readonly string InHandsDateName = "Order.InHandsDate";
        public static readonly string SkuName = "Order.LineItems.Variants.SKU";
        public static readonly string SkuNameOrProductNumber = "Order.LineItems.Variants.SKU | Order.LineItems.Number";
        public static readonly string ProductNumber = "Order.LineItems.Number";
        public static readonly string ShippingCarrierName = "Order.LineItems.ShippingDetail.Carrier";
        public static readonly string OrderOrLineItemCarrier = "Order.LineItems.ShippingDetail.Carrier | Order.ShippingDetail.Carrier";
        public static readonly string DistributorPhoneName = "Distributor.AcknowledgementContact.Phones.Number";
        public static readonly string DistributorAddressName = "Distributor.AcknowledgementContact.Addresses";
        public static readonly string VariantQuantity = "Order.LineItems.Variants.Quantity";
        public static readonly string VariantPrice = "Order.LineItems.Variants.Cost";
        public static readonly string OrderDate = "Order.Date";
        public static readonly string ShippingPersonName = "Order.LineItems.ShippingDetail.To.Name | Order.ShippingDetail.To.Name";
        public static readonly string ShippingAddress1 = "Order.LineItems.ShippingDetail.To.Address.Line1 | Order.ShippingContact.Address.Line1";
        public static readonly string ShippingCityName = "Order.LineItems.ShippingDetail.To.Address.City | Order.ShippingContact.Address.City";
        public static readonly string ShippingStateName = "Order.LineItems.ShippingDetail.To.Address.State | Order.ShippingContact.Address.State";
        public static readonly string ShippingPostalCode = "Order.LineItems.ShippingDetail.To.Address.PostalCode | Order.ShippingContact.Address.PostalCode";

        public Order()
        {
            Properties = new Dictionary<string, Dictionary<string, string>>();
        }

        /// <summary>
        /// Whether warehouse information is required in order to create an order
        /// </summary>
        public bool WarehouseRequired { get; set; }
        /// <summary>
        /// Whether warehouse information is available as part of inventory
        /// </summary>
        public bool WarehouseAvailable { get; set; }
        /// <summary>
        /// List of properties and json format list of validation rules for the order creation functionality
        /// </summary>
        public IDictionary<string, Dictionary<string, string>> Properties { get; set; }
    }
}
