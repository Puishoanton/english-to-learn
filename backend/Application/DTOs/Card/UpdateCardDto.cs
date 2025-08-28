using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.Card
{
    public class UpdateCardDto
    {
        [JsonPropertyName("word")]
        public string? Word { get; set; }

        [JsonPropertyName("translation")]
        public string? Translation { get; set; }

        [JsonPropertyName("word_context")]
        public string? WordContext { get; set; }

        [JsonPropertyName("translation_context")]
        public string? TranslationContext { get; set; }
    }
}
