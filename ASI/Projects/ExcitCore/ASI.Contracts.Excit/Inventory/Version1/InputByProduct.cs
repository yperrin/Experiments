using System.Collections.Generic;

namespace ASI.Contracts.Excit.Inventory.Version1
{
       /// <summary>
    /// The input required to process the request of the inventory status.
    /// </summary>
    public class InputByProduct : BaseInput
    {
        /// <summary>
        /// A collection of products, for which we are searching the inventory.
        /// </summary>
        public List<EntityModel.Product> Products { get; set; }

        /// <summary>
        /// An optional parameter needed to identify a location/warehouse for the product
        /// </summary>
		public string Location { get; set; }

    }
}
