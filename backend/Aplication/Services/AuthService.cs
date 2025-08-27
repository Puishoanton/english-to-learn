using System.Security.Claims;
using System.Text.Json;
using EnglishToLearn.Aplication.DTOs.User;
using EnglishToLearn.Aplication.Interfaces.Repositories;
using EnglishToLearn.Aplication.Interfaces.Services;
using EnglishToLearn.Domain.Entities;
using Google.Apis.Auth;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace EnglishToLearn.Aplication.Services
{
    public class AuthService(
        IUserRepository userRepository,
        IAuthTokenService authTokenService
        ) : IAuthService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IAuthTokenService _authTokenService = authTokenService;

        public async Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginDto googleLoginDto)
        {
            GoogleJsonWebSignature.Payload payload;

            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(googleLoginDto.IdToken);
            }
            catch (InvalidJwtException)
            {
                throw new ArgumentException("Invalid Google ID token.");
            }

            User? user = await _userRepository.GetByEmailAsync(payload.Email);
            if (user is null)
            {
                user = new()
                {
                    Email = payload.Email,
                    CreatedAt = DateTimeOffset.UtcNow,
                    UpdatedAt = DateTimeOffset.UtcNow
                };

                await _userRepository.AddAsync(user);
            }

            string accessToken = _authTokenService.GenerateAccessToken(user);
            string refreshToken = _authTokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            await _userRepository.UpdateAsync(user);

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResponseDto> RefreshTokensAsync(string refreshToken)
        {
            try
            {
                _authTokenService.GetPrincipalFromToken(refreshToken);
            }
            catch
            {
                throw new ArgumentException("Invalid refresh token.");
            }

            User? user = await _userRepository.GetByRefreshTokenAsync(refreshToken);
            if (user is null || user.RefreshToken != refreshToken)
            {
                if (user is not null)
                {
                    user.RefreshToken = null;
                    await _userRepository.UpdateAsync(user);
                }

                throw new ArgumentException("Invalid refresh token.");
            }

            string newAccessToken = _authTokenService.GenerateAccessToken(user);
            string newRefreshToken = _authTokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _userRepository.UpdateAsync(user);

            return new AuthResponseDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task LogoutAsync(string refreshToken)
        {
            try
            {
                _authTokenService.GetPrincipalFromToken(refreshToken);
            }
            catch (SecurityTokenException)
            {
                return;
            }

            User? user = await _userRepository.GetByRefreshTokenAsync(refreshToken);
            if (user is not null && user.RefreshToken == refreshToken)
            {
                user.RefreshToken = null;
                await _userRepository.UpdateAsync(user);
            }
        }
    }
}
