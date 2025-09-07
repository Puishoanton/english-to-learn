using EnglishToLearn.Application.DTOs.Deck;
namespace EnglishToLearn.Application.Interfaces.Services
{
    public interface IDeckService
    {
        Task<ReturnDeckDto?> GetDeckByIdAsync(string? userId, Guid id);
        Task<PageResultDto<ReturnDeckDto>> GetAllDecks(string? userId, string? search, int page, int skip);
        Task<ReturnDeckDto> AddDeckAsync(CreateDeckDto createDeckDto, string? userId);
        Task UpdateDeckAsync(Guid id, UpdateDeckDto updateDeckDto);
        Task DeleteDeckAsync(Guid id);
    }
}
