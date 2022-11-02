using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;

namespace MyCMS.ContentManagementSystem;

[Table("AppContentManagementSystem")]
public class ContentManagementSystem : Entity, IHasCreationTime, IHasModificationTime, IHasDeletionTime
{
    
    public const int MaxTitleLength = 256;
    public const int MaxPageContentLength = int.MaxValue;
    
    [Required]
    [StringLength(MaxTitleLength)]
    public string PageName { get; set; }

    [Required]
    [StringLength(MaxPageContentLength)]
    public string PageContent { get; set; }
    
    public DateTime CreationTime { get; set; }
    public DateTime? LastModificationTime { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletionTime { get; set; }
    public long? DeleterUserId { get; set; }

    public ContentManagementSystem()
    {
        CreationTime = Clock.Now;
    }
    public ContentManagementSystem(string pageName, string pageContent): this()
    {
        PageName = pageName;
        PageContent = pageContent;
    }
}
