using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.Deck
{
    public class UpdateDeckDto
    {
        [Required]
        [JsonPropertyName("userId")]
        public Guid UserId { get; set; }

        [JsonPropertyName("name")]
        public string? Name { get; set; }
        
        [JsonPropertyName("description")]
        public string? Description { get; set; }
    }
}
