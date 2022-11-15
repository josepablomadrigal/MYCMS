using Abp.AutoMapper;
using Abp.FluentValidation;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MyCMS.Authorization;

namespace MyCMS
{
    [DependsOn(
        typeof(MyCMSCoreModule), 
        typeof(AbpAutoMapperModule),
        typeof(AbpFluentValidationModule))]
    public class MyCMSApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<MyCMSAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(MyCMSApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
