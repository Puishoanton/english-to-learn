using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Interfaces.Repositories
{
    public interface IDeckRepository : IRepository<Deck>
    {
        Task<Deck?> GetByIdWithCardsAsync(Guid userId, Guid id);
        Task<ICollection<Deck>> GetAllWithCardsAsync(Guid userId, string? search, int page, int skip);
        Task<int> GetCardsTotalCountAsync(Guid userId);
    }
}
