using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.User
{
    public class GoogleLoginDto
    {
        [Required]
        [JsonPropertyName("idToken")]
        public string? IdToken { get; set; }
    }
}
