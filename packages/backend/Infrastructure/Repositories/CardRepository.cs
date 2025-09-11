using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Domain.Entities;
using EnglishToLearn.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishToLearn.Infrastructure.Repositories
{

    public class CardRepository(AppDbContext context) : GenericRepository<Card>(context), ICardRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<ICollection<Card>> GetAllCardsByDeckIdAsync(string deckId)
        {
            return await _context.Cards.Where(card => card.DeckId == Guid.Parse(deckId)).OrderBy(card => card.CreatedAt).ToListAsync();
        }

    }
}
