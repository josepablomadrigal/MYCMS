using System;
using System.Linq;
using FluentValidation;
using HtmlAgilityPack;

namespace MyCMS.ContentManagementSystem.Dto.Validator;

public class InsertUpdateCMSInputValidator: AbstractValidator<UpsertCMSInput>
{
    public InsertUpdateCMSInputValidator()
    {
        
        RuleFor(x => x.PageContent).NotEmpty().WithMessage("Page Content is required");
        RuleFor(x => x.PageName).NotEmpty().WithMessage("Page Name is required");
        RuleFor(x => x.PageContent).Must(IsValidHTML).WithMessage("Page Content html format has errors");
    }
    private bool IsValidHTML(string pageContent)
    {
        try
        {
            var htmlDocument = new HtmlDocument();
            htmlDocument.OptionFixNestedTags = true;
            htmlDocument.LoadHtml(pageContent.Trim());
            var parseErrors = htmlDocument.ParseErrors;
            if (parseErrors.Any())
            {
                return false;                
            }
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }
}