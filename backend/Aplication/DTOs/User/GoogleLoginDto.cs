using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishToLearn.Aplication.DTOs.User
{
    public class GoogleLoginDto
    {
        [Required]
        [JsonPropertyName("idToken")]
        public string? IdToken { get; set; }
    }
}
