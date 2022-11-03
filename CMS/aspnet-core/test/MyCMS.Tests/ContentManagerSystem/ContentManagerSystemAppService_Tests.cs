using System.Threading.Tasks;
using MyCMS.ContentManagementSystem;
using Shouldly;
using Xunit;

namespace MyCMS.Tests.ContentManagerSystem;

public class ContentManagerSystemAppService_Tests : MyCMSTestBase
{
    private readonly IContentManagerSystemAppService _contentManagerSystemAppService;

    public ContentManagerSystemAppService_Tests()
    {
        _contentManagerSystemAppService = Resolve<IContentManagerSystemAppService>();
    }

    [Fact]
    public async Task Should_Get_Content_Items()
    {
        // Act
        var output = await _contentManagerSystemAppService.GetAll();

        // Assert
        output.ShouldNotBeNull();
        output.Items.Count.ShouldBeGreaterThan(0);
    }
}
    
