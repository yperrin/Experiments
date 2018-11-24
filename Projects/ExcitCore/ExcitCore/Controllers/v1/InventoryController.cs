using ASI.Contracts.Excit.Inventory.Version1;
using excit.common.model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using excit.services.Version1;

namespace ExcitCore.Controllers.v1
{
    [Produces("application/json")]
    [Route("api/v1/products/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        InventoryHandler _inventoryHandler;
        public InventoryController(InventoryHandler inventoryHandler)
        {
            _inventoryHandler = inventoryHandler;
        }

        [HttpPost]
        public async Task<ActionResult<Output>> Get([FromBody] InputByProduct input)
        {
            return await _inventoryHandler.Process((Lamar.IServiceContext)HttpContext.RequestServices, input).ConfigureAwait(false);
        }
    }
}
