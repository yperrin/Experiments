using System.Collections.Generic;
using System.Linq;

namespace ASI.Contracts.Excit.Inventory.Version1
{
    /// <summary>
    /// The output return by the API against the inventory input request.
    /// </summary>
    public class Output : BaseOutput
    {
        /// <summary>
        /// Details of the product inventory, for all the requested products.
        /// </summary>
		public List<ProductQuantities> ProductQuantities { get; set; }
        public bool IsValid { get; set; } = true;
    }
}