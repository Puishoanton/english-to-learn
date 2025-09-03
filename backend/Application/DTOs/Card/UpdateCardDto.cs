using System.Text.Json.Serialization;

namespace EnglishToLearn.Application.DTOs.Card
{
    public class UpdateCardDto
    {
        [JsonPropertyName("word")]
        public string? Word { get; set; }

        [JsonPropertyName("translation")]
        public string? Translation { get; set; }

        [JsonPropertyName("wordContext")]
        public string? WordContext { get; set; }

        [JsonPropertyName("translationContext")]
        public string? TranslationContext { get; set; }
    }
}
