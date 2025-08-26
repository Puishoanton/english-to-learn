using EnglishToLearn.Aplication.DTOs.Deck;
using EnglishToLearn.Domain.Entities;
namespace EnglishToLearn.Aplication.Interfaces.Services
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
