using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.Card
{
    public class CreateCardDto
    {
        [Required]
        [JsonPropertyName("word")]
        public string Word { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("translation")]
        public string Translation { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("word_context")]
        public string WordContext { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("translation_context")]
        public string TranslationContext { get; set; } = string.Empty;
    }
}
