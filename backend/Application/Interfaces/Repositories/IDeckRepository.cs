using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Interfaces.Repositories
{
    public interface IDeckRepository : IRepository<Deck>
    {
        Task<Deck?> GetByIdWithCardsAsync(Guid id);
        Task<ICollection<Deck>> GetAllWithCardsAsync();
    }
}