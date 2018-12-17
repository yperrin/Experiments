using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace excit.common.model
{
    public enum ApiType { Inventory, OrderStatus, OrderCreation, Pricing, LoginValidate, Suppliers, SaveProduct, ServiceProviderLogin, OrdrShipNotification, ProductIntegration }
    public class Api
    { 
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("implementation")]
        public string Implementation { get; set; }
        [BsonElement("defaultCredentials")]
        public Credentials DefaultCredentials { get; set; }
        [BsonElement("url")]
        public string Url { get; set; }
        [BsonElement("supplierEmails")]
        public string SupplierEmails { get; set; }
        [BsonElement("properties")]
        public IEnumerable<Property> Properties { get; set; }

    }
}
