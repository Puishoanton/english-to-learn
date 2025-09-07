using System.Security.Claims;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Interfaces.Services
{
    public interface IAuthTokenService
    {
        string GenerateTokensAndSetCookies(User user, HttpResponse response);
        ClaimsPrincipal GetPrincipalFromToken(string? token);
        void DeleteCookies(HttpResponse response);
    }
}
