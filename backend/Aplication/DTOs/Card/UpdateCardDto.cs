using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishToLearn.Aplication.DTOs.Card
{
    public class UpdateCardDto
    {
        [Required]
        [JsonPropertyName("deckId")]
        public Guid DeckId { get; set; }

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