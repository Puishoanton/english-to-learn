using EnglishToLearn.Application.DTOs.Deck;
namespace EnglishToLearn.Application.Interfaces.Services
{
    public interface IDeckService
    {
        Task<ReturnDeckDto?> GetDeckByIdAsync(Guid id);
        Task<ICollection<ReturnDeckDto>> GetAllDecks();
        Task<ReturnDeckDto> AddDeckAsync(CreateDeckDto createDeckDto, string? userId);
        Task UpdateDeckAsync(Guid id, UpdateDeckDto updateDeckDto);
        Task DeleteDeckAsync(Guid id);
    }
}
