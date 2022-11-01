using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using MyCMS.Configuration.Dto;

namespace MyCMS.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : MyCMSAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
