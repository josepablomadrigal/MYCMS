using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;

namespace MyCMS.ContentManagementSystem.Dto;

[AutoMapFrom(typeof(ContentManagementSystem))]
public class ContentManagementSystemDto : EntityDto, IHasCreationTime, IHasModificationTime, IHasDeletionTime
{
    public string PageName { get; set; }
    public string PageContent { get; set; }
    public DateTime CreationTime { get; set; }
    public DateTime? LastModificationTime { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletionTime { get; set; }
    public long? DeleterUserId { get; set; }
}