using System.ComponentModel.DataAnnotations;

namespace ASI.Contracts.Excit
{
    /// <summary>
    /// Supplier details
    /// </summary>
	public class Company
	{
        /// <summary>
        /// Id of the supplier company.
        /// </summary>
        [Required]
        public int CompanyId { get; set; }

        /// <summary>
        /// ASI number of the supplier.
        /// </summary>
		public int AsiNumber { get; set; }
	}
}