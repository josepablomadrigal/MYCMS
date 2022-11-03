using Abp.AutoMapper;

namespace MyCMS.ContentManagementSystem.Dto;

[AutoMapTo(typeof(ContentManagementSystem))]
public class InsertUpdateCMSInput
{
    public int? Id { get; set; }
    public string PageName { get; set; }
    public string PageContent { get; set; }
}