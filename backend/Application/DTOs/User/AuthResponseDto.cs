using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.User
{
    public class AuthResponseDto
    {
        [JsonPropertyName("email")]
        public string? Email { get; set; }
    }
}
