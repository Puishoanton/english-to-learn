using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Interfaces.Repositories
{
    public interface ICardRepository : IRepository<Card>
    {
        Task<ICollection<Card>> GetAllCardsByDeckIdAsync(string deckId);
    }
}
