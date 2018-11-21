using System.Collections.Generic;

namespace ASI.Contracts.Excit.Inventory.Version1
{
    /// <summary>
    /// Details of the Product Inventory.
    /// </summary>
	public class ProductQuantities
	{
        /// <summary>
        /// Unique Identifier of a product.
        /// </summary>
		public string ProductIdentifier { get; set; }

        /// <summary>
        /// Details information about a product.
        /// </summary>
		public string ProductDescription { get; set; }

        /// <summary>
        /// Quantity details of the products
        /// </summary>
		public List<Quantity> Quantities { get; set; }
	}
}