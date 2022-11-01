using Abp.Application.Services;
using MyCMS.MultiTenancy.Dto;

namespace MyCMS.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

