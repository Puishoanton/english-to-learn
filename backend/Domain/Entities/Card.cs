using System.ComponentModel.DataAnnotations;

namespace EnglishToLearn.Domain.Entities
{
    public class Card
    {
        public Guid Id { get; set; }

        [Required]
        public string Word { get; set; } = string.Empty;

        [Required]
        public string WordContext { get; set; } = string.Empty;

        [Required]
        public string Translation { get; set; } = string.Empty;

        [Required]
        public string TranslationContext { get; set; } = string.Empty;

        public Guid DeckId { get; set; }
        public Deck? Deck{ get; set; }

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; }
    }
}

