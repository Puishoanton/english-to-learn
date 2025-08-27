using EnglishToLearn.Aplication.DTOs.User;

namespace EnglishToLearn.Aplication.Interfaces.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginDto googleLoginDto);
        Task<AuthResponseDto> RefreshTokensAsync(string refreshToken);
        Task LogoutAsync(string refreshToken);
    }
}
