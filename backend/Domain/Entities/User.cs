using System.ComponentModel.DataAnnotations;

namespace EnglishToLearn.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; }


        public ICollection<Deck> Decks { get; set; } = new List<Deck>();
    }
}
