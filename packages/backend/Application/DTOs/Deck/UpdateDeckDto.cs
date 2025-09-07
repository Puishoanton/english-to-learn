using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.Deck
{
    public class UpdateDeckDto
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        
        [JsonPropertyName("description")]
        public string? Description { get; set; }
    }
}
