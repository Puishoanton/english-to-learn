using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Application.Enums;

namespace EnglishToLearn.Application.Interfaces.Services
{
    public interface ICardService
    {
        Task<ReturnCardDto?> GetCardByIdAsync(Guid id);
        Task<ICollection<ReturnCardDto>> GetAllCards(string deckId);
        Task<ReturnCardDto> AddCardAsync(CreateCardDto createCardDto, string deckId);
        Task UpdateCardAsync(Guid id, UpdateCardDto updateCardDto);
        Task DeleteCardAsync(Guid id);
        Task ChangeCardProgressAsync(Guid id, CardProgressAction CardProgressAction);
    }
}
