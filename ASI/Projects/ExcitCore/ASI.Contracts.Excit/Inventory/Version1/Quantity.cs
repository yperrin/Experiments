namespace ASI.Contracts.Excit.Inventory.Version1
{
    /// <summary>
    /// Quantity detail.
    /// </summary>
	public class Quantity
    {
        /// <summary>
        /// Location of the product requested.
        /// </summary>
		public string Location { get; set; }

        /// <summary>
        /// Numeric quantity value when available. Extracted from the Label property when possible.
        /// </summary>
		public int? Value { get; set; }

        /// <summary>
        /// Quantity as text (i.e. Out of stock, Always available or 200)
        /// </summary>
		public string Label { get; set; }

        /// <summary>
        /// Product variant Code.
        /// </summary>
        public string PartCode { get; set; }

        /// <summary>
        /// Description of the product variant
        /// </summary>
		public string PartDescription { get; set; }
    }
}