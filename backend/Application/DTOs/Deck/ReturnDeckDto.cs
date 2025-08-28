using EnglishToLearn.Application.DTOs.Card;

namespace EnglishToLearn.Application.DTOs.Deck
{
    public class ReturnDeckDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Guid UserId { get; set; }
        public ICollection<ReturnCardDto> Cards { get; set; } = [];
    }
}
