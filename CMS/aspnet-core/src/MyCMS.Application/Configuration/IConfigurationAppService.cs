using System.Threading.Tasks;
using MyCMS.Configuration.Dto;

namespace MyCMS.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
