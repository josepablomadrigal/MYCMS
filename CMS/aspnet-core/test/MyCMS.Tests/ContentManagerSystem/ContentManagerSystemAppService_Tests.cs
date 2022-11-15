using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Uow;
using Abp.Runtime.Validation;
using MyCMS.ContentManagementSystem;
using MyCMS.ContentManagementSystem.Dto;
using Shouldly;
using Xunit;

namespace MyCMS.Tests.ContentManagerSystem;

public class ContentManagerSystemAppService_Tests : MyCMSTestBase
{
    private readonly IContentManagerSystemAppService _contentManagerSystemAppService;

    private readonly string _validPageContentHtml = @"<title>
Hello One
</title>
<style>
</style>
<head>
</head>
<body>
<h1>Hello one </h1>
</body>"; 

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
        var output = await _contentManagerSystemAppService.GetCMSContent(1);

        // Assert
        output.ShouldNotBeNull();
        output.Id.ShouldBe(1);
        output.PageName.ShouldBe("one");
        output.PageContent.ShouldContain(_validPageContentHtml);
    }
    
    [Fact]
    public async void Should_Insert_Content()
    {
        // Act
        var input = new UpsertCMSInput() { PageName = "test", PageContent = _validPageContentHtml.Trim() };
        await _contentManagerSystemAppService.Upsert(input);
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
        var htmlContentUpdated = @"<!DOCTYPE html>
            <html>
	        <head>
            <style>
            </style>
            </head>
            <body>
            <h1>Custom html</h1>
            <p>validation</p>
            </body>
            </html>";
        var inputInsert = new UpsertCMSInput() { PageName = "testCMSUpdate", PageContent = _validPageContentHtml };
        
        // Act
        await _contentManagerSystemAppService.Upsert(inputInsert);
        var output = await _contentManagerSystemAppService.GetAll();
        var contentAdded = output.Items.FirstOrDefault(item => item.PageName == inputInsert.PageName);
        var inputUpdate = new UpsertCMSInput() { Id = contentAdded.Id, PageName = "testCMSUpdate2`", PageContent = htmlContentUpdated.Trim() };
        await _contentManagerSystemAppService.Upsert(inputUpdate);
        var contentUpdated = await _contentManagerSystemAppService.GetCMSContent(contentAdded.Id);
        
        // Assert
        contentUpdated.ShouldNotBeNull();
        contentUpdated.PageName.ShouldBe(inputUpdate.PageName);
        contentUpdated.PageContent.ShouldBe(inputUpdate.PageContent);
        contentUpdated.LastModificationTime.ShouldNotBeNull();
    }

    [Theory]
    [InlineData("")]
    [InlineData("<test>")]
    [InlineData("</test>")]
    [InlineData("<test>test")]
    [InlineData(@"<test name="">test</test>")]
    [InlineData(@"<test name="">
    <test2>
    </test>")]
    [InlineData(@"<test name="">
    <test>test
    </test>")]
    [InlineData(@"<test name="">
    <test>test<test>
    </test>")]
    public async void Should_Throw_AbpValidationException_When_Insert_Invalid_Page_Content_(string pageContent)
    {
        // Act
        var input = new UpsertCMSInput()
        {
            PageName = "test", PageContent = pageContent
        };

        // Assert
        await Assert.ThrowsAsync<AbpValidationException>(async () =>
            await _contentManagerSystemAppService.Upsert(input));
    }
    
    [Fact]
    public async void Should_Throw_AbpDbConcurrencyException_When_Update_NonExisting_Content()
    {
        // Act
        var input = new UpsertCMSInput()
        {
            Id = 9999, PageName = "test", PageContent = _validPageContentHtml
        };

        // Assert
        await Assert.ThrowsAsync<AbpDbConcurrencyException>(async () =>
            await _contentManagerSystemAppService.Upsert(input));
    }
    
    [Fact]
    public async void Should_Throw_EntityNotFoundException_When_Get_NonExisting_Content()
    {
        // Act
        var id = 90000;

        // Assert
        await Assert.ThrowsAsync<EntityNotFoundException>(async () =>
            await _contentManagerSystemAppService.GetCMSContent(id));
    }
}
    
