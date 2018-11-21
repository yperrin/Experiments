using ASI.Contracts.Excit.Inventory.Version1;
using excit.common;
using excit.common.model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExcitCore.Controllers.v1
{
    [Produces("application/json")]
    [Route("api/v1/products/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Supplier>>> Get([FromBody] InputByProduct input)
        {
            var configurationRepository = new ConfigurationRepository("mongodb://localhost:27017", "excit");
            var suppliers = await configurationRepository.List().ConfigureAwait(false);
            return suppliers;
        }
    }
}
