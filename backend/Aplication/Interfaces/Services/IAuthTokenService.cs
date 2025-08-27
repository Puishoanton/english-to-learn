using System.Security.Claims;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Aplication.Interfaces.Services
{
    public interface IAuthTokenService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromToken(string token);
    }
}
