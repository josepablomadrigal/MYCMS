using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCMS.ContentManagementSystem.Dto;

namespace MyCMS.ContentManagementSystem;

public interface IContentManagerSystemAppService: IApplicationService
{
    Task<ListResultDto<ContentManagementSystemDto>> GetAll();
    Task<ContentManagementSystemDto> GetCMSContent(GetCMSInput input);
    Task InsertOrUpdateCMSContent(InsertUpdateCMSInput input);
    
}