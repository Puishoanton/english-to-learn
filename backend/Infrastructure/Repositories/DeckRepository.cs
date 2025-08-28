using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Domain.Entities;
using EnglishToLearn.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishToLearn.Infrastructure.Repositories
{
    public class DeckRepository(AppDbContext context) : GenericRepository<Deck>(context), IDeckRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Deck?> GetByIdWithCardsAsync(Guid id)
        {
            return await _context.Decks
                .Include(deck => deck.Cards)
                .FirstOrDefaultAsync(deck => deck.Id == id);
        }

        public async Task<ICollection<Deck>> GetAllWithCardsAsync()
        {
            return await _context.Decks
                .Include(deck => deck.Cards)
                .ToListAsync();
        }

    }
}