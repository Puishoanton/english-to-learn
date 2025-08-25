using EnglishToLearn.Aplication.Interfaces.Repositories;
using EnglishToLearn.Domain.Entities;
using EnglishToLearn.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishToLearn.Infrastructure.Repositories
{

    public class CardRepository(AppDbContext context) : IRepository<Card>
    {
        private readonly AppDbContext _context = context;

        public async Task<Card?> GetByIdAsync(Guid id)
        {
            return await _context.Cards.FindAsync(id);
        }

        public async Task<ICollection<Card>> GetAllAsync()
        {
            return await _context.Cards.ToListAsync();
        }

        public async Task AddAsync(Card card)
        {
            await _context.Cards.AddAsync(card);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Card card)
        {
            _context.Cards.Update(card);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            Card? card = await _context.Cards.FindAsync(id);
            if (card != null)
            {
                _context.Cards.Remove(card);
                await _context.SaveChangesAsync();
            }
        }
    }
}
