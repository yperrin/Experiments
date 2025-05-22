using MongoDB.Bson.Serialization.Attributes;

namespace excit.common.model
{
    public class Property
    {
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("type")]
        public string Type { get; set; }
        [BsonElement("value")]
        public string Value { get; set; }
    }
}
