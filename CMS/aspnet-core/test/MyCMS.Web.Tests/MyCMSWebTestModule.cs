using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MyCMS.EntityFrameworkCore;
using MyCMS.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace MyCMS.Web.Tests
{
    [DependsOn(
        typeof(MyCMSWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class MyCMSWebTestModule : AbpModule
    {
        public MyCMSWebTestModule(MyCMSEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MyCMSWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(MyCMSWebMvcModule).Assembly);
        }
    }
}