using EnglishToLearn.Application.DTOs.User;

namespace EnglishToLearn.Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginDto googleLoginDto);
        Task<AuthResponseDto> RefreshTokensAsync(string? refreshToken);
        Task LogoutAsync(string refreshToken);
    }
}
