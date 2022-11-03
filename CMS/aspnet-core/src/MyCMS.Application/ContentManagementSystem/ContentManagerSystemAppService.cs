using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using MyCMS.ContentManagementSystem.Dto;

namespace MyCMS.ContentManagementSystem;

public class ContentManagerSystemAppService : MyCMSAppServiceBase, IContentManagerSystemAppService
{
    private readonly IRepository<ContentManagementSystem> _cmsRepository;

    public ContentManagerSystemAppService(IRepository<ContentManagementSystem> cmsRepository)
    {
        _cmsRepository = cmsRepository;
    }
    
    public async Task<ListResultDto<ContentManagementSystemDto>> GetAll()
    {
        var allContentManagementSystem = await _cmsRepository.GetAll()
            .OrderByDescending(t => t.CreationTime).ToListAsync();
        
        return new ListResultDto<ContentManagementSystemDto>(
            ObjectMapper.Map<List<ContentManagementSystemDto>>(allContentManagementSystem)
        );
    }

    public Task<ContentManagementSystemDto> GetCMSContent(GetCMSInput input)
    {
        throw new System.NotImplementedException();
    }

    public Task InsertOrUpdateCMSContent(InsertUpdateCMSInput input)
    {
        throw new System.NotImplementedException();
    }
}