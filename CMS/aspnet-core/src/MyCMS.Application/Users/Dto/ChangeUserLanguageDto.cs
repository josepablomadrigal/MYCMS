using System.ComponentModel.DataAnnotations;

namespace MyCMS.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}