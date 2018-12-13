using ASI.Contracts.Excit.Inventory.Version1;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using excit.services.Version1;
using Microsoft.Extensions.Logging;
using System;

namespace ExcitCore.Controllers.v1
{
    [Produces("application/json")]
    [Route("api/v1/products/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        ILogger _logger;
        InventoryHandler _inventoryHandler;
        public InventoryController(ILoggerFactory loggerFactory, InventoryHandler inventoryHandler)
        {
            _logger = loggerFactory.CreateLogger(typeof(InventoryController));
            _inventoryHandler = inventoryHandler;
        }

        [HttpPost]
        public async Task<ActionResult<Output>> Get([FromBody] InputByProduct input)
        {
            _logger.LogDebug("Get - Start");
            var start = DateTime.Now;
            var output = await _inventoryHandler.Process(input).ConfigureAwait(false);
            _logger.LogDebug("Get - End - " + (DateTime.Now - start).TotalMilliseconds);
            return output;
        }
    }
}
