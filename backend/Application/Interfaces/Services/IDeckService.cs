using EnglishToLearn.Application.DTOs.Deck;
using EnglishToLearn.Domain.Entities;
namespace EnglishToLearn.Application.Interfaces.Services
{
    public interface IDeckService
    {
        Task<Deck?> GetDeckByIdAsync(Guid id);
        Task<ICollection<Deck>> GetAllDecks();
        Task AddDeckAsync(Deck deck);
        Task UpdateDeckAsync(Guid id, UpdateDeckDto updateDeckDto);
        Task DeleteDeckAsync(Guid id);
    }
}
