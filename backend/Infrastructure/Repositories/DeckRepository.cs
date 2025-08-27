using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Domain.Entities;
using EnglishToLearn.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishToLearn.Infrastructure.Repositories
{
    public class DeckRepository (AppDbContext context) : IRepository<Deck>
    {
        private readonly AppDbContext _context = context;

        public async Task<Deck?> GetByIdAsync(Guid id)
        {
            return await _context.Decks.FindAsync(id);
        }

        public async Task<ICollection<Deck>> GetAllAsync()
        {
            return await _context.Decks.ToListAsync();
        }

        public async Task AddAsync(Deck deck)
        {
            await _context.Decks.AddAsync(deck);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Deck deck)
        {
            _context.Decks.Update(deck);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            Deck ? deck = await _context.Decks.FindAsync(id);
            if(deck !=null)
            {
                _context.Decks.Remove(deck);
                await _context.SaveChangesAsync();
            }
        }
    }
}
