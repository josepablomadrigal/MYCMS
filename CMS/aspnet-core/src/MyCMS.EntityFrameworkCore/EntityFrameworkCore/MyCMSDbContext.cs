using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using MyCMS.Authorization.Roles;
using MyCMS.Authorization.Users;
using MyCMS.MultiTenancy;

namespace MyCMS.EntityFrameworkCore
{
    public class MyCMSDbContext : AbpZeroDbContext<Tenant, Role, User, MyCMSDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public MyCMSDbContext(DbContextOptions<MyCMSDbContext> options)
            : base(options)
        {
        }
    }
}
