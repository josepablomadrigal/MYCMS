using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace MyCMS.Controllers
{
    public abstract class MyCMSControllerBase: AbpController
    {
        protected MyCMSControllerBase()
        {
            LocalizationSourceName = MyCMSConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
