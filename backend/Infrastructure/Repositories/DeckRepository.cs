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

        public async Task<ICollection<Deck>> GetAllWithCardsAsync(string? search, int page, int skip)
        {
            return await _context.Decks
               .Include(deck => deck.Cards)
               .Where(deck => string.IsNullOrEmpty(search) || EF.Functions.ILike(deck.Name, $"%{search}%"))
               .Skip((page - 1) * skip)
               .Take(skip)
               .ToListAsync();
        }

        public async Task<int> GetCardsTotalCountAsync()
        {
            return await _context.Decks.CountAsync();
        }

    }
}