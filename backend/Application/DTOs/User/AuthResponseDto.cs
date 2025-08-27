using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.User
{
    public class AuthResponseDto
    {
        [JsonPropertyName("accessToken")]
        public string? AccessToken { get; set; }

        [JsonPropertyName("refreshToken")]
        public string? RefreshToken { get; set; }
    }
}
