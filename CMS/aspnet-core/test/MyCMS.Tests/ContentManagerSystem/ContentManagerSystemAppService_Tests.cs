using System.Linq;
using System.Threading.Tasks;
using MyCMS.ContentManagementSystem;
using MyCMS.ContentManagementSystem.Dto;
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
    
    [Fact]
    public async Task Should_Get_Content_Item()
    {
        // Act
        var output = await _contentManagerSystemAppService.GetCMSContent(new GetCMSInput{ Id = 1 });

        // Assert
        output.ShouldNotBeNull();
        output.Id.ShouldBe(1);
        output.PageName.ShouldBe("one");
        output.PageContent.ShouldContain(@"<title>
Hello One
</title>
</head>
<body>
<h1>Hello one </h1>");
    }
    
    [Fact]
    public async void Should_Insert_Content()
    {
        // Act
        var input = new InsertUpdateCMSInput() { PageName = "test", PageContent = "test" };
        await _contentManagerSystemAppService.InsertOrUpdateCMSContent(input);
        var output = await _contentManagerSystemAppService.GetAll();
        var contentAdded = output.Items.FirstOrDefault(item => item.PageName == input.PageName);
        
        // Assert
        contentAdded.ShouldNotBeNull();
        contentAdded.PageName.ShouldBe(input.PageName);
        contentAdded.PageContent.ShouldBe(input.PageContent);
    }

    [Fact]
    public async void Should_Update_Content()
    {
        // Act
        var input = new InsertUpdateCMSInput() { PageName = "test", PageContent = "test" };
        await _contentManagerSystemAppService.InsertOrUpdateCMSContent(input);
        var output = await _contentManagerSystemAppService.GetAll();
        var contentAdded = output.Items.FirstOrDefault(item => item.PageName == input.PageName);
        var inputUpdate = new InsertUpdateCMSInput() { Id = contentAdded.Id, PageName = "test2", PageContent = "test2" };
        await _contentManagerSystemAppService.InsertOrUpdateCMSContent(inputUpdate);
        var contentUpdated = await _contentManagerSystemAppService.GetCMSContent(new GetCMSInput{ Id = contentAdded.Id });
        
        
        // Assert
        contentUpdated.ShouldNotBeNull();
        contentUpdated.PageName.ShouldBe(inputUpdate.PageName);
        contentUpdated.PageContent.ShouldBe(inputUpdate.PageContent);
        contentUpdated.LastModificationTime.ShouldNotBeNull();
    }
    
}
    
