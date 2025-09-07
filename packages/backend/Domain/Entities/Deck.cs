using System.ComponentModel.DataAnnotations;

namespace EnglishToLearn.Domain.Entities
{
    public class Deck
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;


        public string? Description { get; set; } = string.Empty;

        public Guid UserId { get; set; }
        public User? User { get; set; }

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; }

        public ICollection<Card> Cards { get; set; } = new List<Card>();
    }
}