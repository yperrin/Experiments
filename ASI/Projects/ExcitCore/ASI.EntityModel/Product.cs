using System.Collections.Generic;

namespace ASI.EntityModel
{
    public class Product
    {
        public long Id { get; set; }
        public string Number { get; set; }
        public List<string> Numbers { get; set; }
        public List<ProductSku> SKU { get; set; }
    }
}
