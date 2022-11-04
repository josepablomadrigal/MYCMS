using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using MyCMS.ContentManagementSystem.Dto;

namespace MyCMS.ContentManagementSystem;

/// <summary>
/// ContentManagementSystemAppService is used to implement business logic of the Content Management System.
/// </summary>
public class ContentManagerSystemAppService : MyCMSAppServiceBase, IContentManagerSystemAppService
{
    private readonly IRepository<ContentManagementSystem> _cmsRepository;

    public ContentManagerSystemAppService(IRepository<ContentManagementSystem> cmsRepository)
    {
        _cmsRepository = cmsRepository;
    }
    
    /// <summary>
    /// Get all CMS content
    /// </summary>
    /// <returns></returns>
    public async Task<ListResultDto<ContentManagementSystemDto>> GetAll()
    {
        var allContentManagementSystem = await _cmsRepository.GetAll()
            .OrderByDescending(t => t.CreationTime).ToListAsync();
        
        return new ListResultDto<ContentManagementSystemDto>(
            ObjectMapper.Map<List<ContentManagementSystemDto>>(allContentManagementSystem)
        );
    }

    /// <summary>
    /// Get CMS content by Id
    /// </summary>
    /// <param name="pageId"></param>
    /// <returns>Content page</returns>
    public async Task<ContentManagementSystemDto> GetCMSContent(int pageId)
    {
        var content = await _cmsRepository.GetAsync(pageId);
        return ObjectMapper.Map<ContentManagementSystemDto>(content);
    }

    /// <summary>
    /// Inserts or updates a cms content.
    /// </summary>
    /// <remarks>Page name and Page content are required fields</remarks>
    /// <param name="input">Used to insert/update page content</param>
    public async Task InsertOrUpdateCMSContent(InsertUpdateCMSInput input)
    {
        var cms = ObjectMapper.Map<ContentManagementSystem>(input);
        await _cmsRepository.InsertOrUpdateAsync(cms);
    }
}