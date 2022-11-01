using System.Threading.Tasks;
using Abp.Application.Services;
using MyCMS.Authorization.Accounts.Dto;

namespace MyCMS.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
