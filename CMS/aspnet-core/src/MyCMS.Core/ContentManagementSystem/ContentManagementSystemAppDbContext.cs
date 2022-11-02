using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MyCMS.ContentManagementSystem;

public class ContentManagementSystemAppDbContext : AbpDbContext
{
    public DbSet<ContentManagementSystem> ContentManagementSystems { get; set; }
    public ContentManagementSystemAppDbContext(DbContextOptions<ContentManagementSystemAppDbContext> options) 
        : base(options)
    {
    }
}