using EnglishToLearn.Application.DTOs.User;

namespace EnglishToLearn.Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginDto googleLoginDto, HttpResponse response);
        Task<AuthResponseDto> RefreshTokensAsync(string? refreshToken, HttpResponse response);
        Task LogoutAsync(string refreshToken, HttpResponse response);
    }
}
