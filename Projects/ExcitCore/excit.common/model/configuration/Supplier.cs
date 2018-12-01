using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace excit.common.model
{
    public class Supplier
    {
        [BsonElement("_id")]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("asiNumber")]
        public string AsiNumber { get; set; }
        [BsonElement("loginInstructions")]
        public string LoginInstructions { get; set; }
        [BsonElement("apis")]
        public IEnumerable<Api> Apis { get; set; }
    }
}
