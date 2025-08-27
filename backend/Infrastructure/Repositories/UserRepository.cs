using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Domain.Entities;
using EnglishToLearn.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishToLearn.Infrastructure.Repositories
{
    public class UserRepository(AppDbContext context) : GenericRepository<User>(context), IUserRepository
    {
        private readonly AppDbContext _context = context;
        public async Task<User?> GetByEmailAsync (string email)
        {
            return await _context.Users.FirstOrDefaultAsync(user=> user.Email == email);
        }

        public async Task<User?> GetByRefreshTokenAsync (string refreshId )
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.RefreshToken == refreshId);

        }

    }
}
