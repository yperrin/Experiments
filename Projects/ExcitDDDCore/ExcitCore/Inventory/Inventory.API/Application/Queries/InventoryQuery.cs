using System.Threading;
using System.Threading.Tasks;
using ASI.Contracts.Excit.Inventory.Version1;
using MediatR;

namespace ExcitCore.Inventory.Inventory.API.Application.Queries
{
    public class InventoryQueryRequest : IRequest<Output> { };

    public class InventoryQuery : IRequestHandler<InventoryQueryRequest, Output>
    {
        public InventoryQuery()
        {
            //repo - event service?
        }

        public Task<Output> Handle(InventoryQueryRequest request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
