using System.Collections.Generic;

namespace ASI.EntityModel
{
    public class ProductSku
    {
        public string SKU { get; set; }
        public List<ProductSkuValue> Values { get; set; }
    }
}
