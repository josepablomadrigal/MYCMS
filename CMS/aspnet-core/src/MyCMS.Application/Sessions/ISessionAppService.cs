using System.Threading.Tasks;
using Abp.Application.Services;
using MyCMS.Sessions.Dto;

namespace MyCMS.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
