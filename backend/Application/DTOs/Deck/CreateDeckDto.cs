using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.Deck
{
    public class CreateDeckDto
    {
        [Required]
        [JsonPropertyName("userId")]
        public Guid UserId { get; set; }

        [Required]
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string? Description { get; set; }
    }


}
