using ASI.Contracts.Excit.Inventory.Version1;
using System.Threading.Tasks;
using excit.common.model;

namespace asi.excit.common.Interfaces.version1
{
    /// <summary>
    /// Interface for specific implementations of Inventory
    /// </summary>
    public interface IInventory : IService
    {
        /// <summary>
        /// Get the inventory details of a product from the supplier
        /// </summary>
        /// <param name="input"></param>
        /// <param name="supplierConfiguration"></param>
        /// <returns></returns>
	    Task<Output> GetByProductAsync(InputByProduct input, Supplier supplierConfiguration);
    }
}
