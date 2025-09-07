using System.ComponentModel.DataAnnotations;

namespace EnglishToLearn.Domain.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string? Email { get; set; }

        public string? RefreshToken { get; set; }

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; }


        public ICollection<Deck> Decks { get; set; } = new List<Deck>();
    }
}
