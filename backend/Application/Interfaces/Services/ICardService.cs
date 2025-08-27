using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Interfaces.Services
{
    public interface ICardService
    {
        Task<Card?> GetCardByIdAsync(Guid id);
        Task<ICollection<Card>> GetAllCards();
        Task AddCardAsync(Card card);
        Task UpdateCardAsync(Guid id, UpdateCardDto updateCardDto);
        Task DeleteCardAsync(Guid id);
    }
}
