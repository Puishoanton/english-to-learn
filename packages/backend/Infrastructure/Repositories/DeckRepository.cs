using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Domain.Entities;
using EnglishToLearn.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishToLearn.Infrastructure.Repositories
{
    public class DeckRepository(AppDbContext context) : GenericRepository<Deck>(context), IDeckRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Deck?> GetByIdWithCardsAsync(Guid userId, Guid id)
        {
            return await _context.Decks
                .Where(deck => deck.UserId == userId)
                .Include(deck => deck.Cards)
                .FirstOrDefaultAsync(deck => deck.Id == id);
        }

        public async Task<ICollection<Deck>> GetAllWithCardsAsync(Guid userId, string? search, int page, int skip)
        {
            return await _context.Decks
               .Where(deck => deck.UserId == userId)
               .Include(deck => deck.Cards)
               .Where(deck => string.IsNullOrEmpty(search) || EF.Functions.ILike(deck.Name, $"%{search}%"))
               .Skip((page - 1) * skip)
               .Take(skip)
               .ToListAsync();
        }

        public async Task<int> GetCardsTotalCountAsync(Guid userId)
        {
            return await _context.Decks.Where(deck => deck.UserId == userId).CountAsync();
        }

    }
}
