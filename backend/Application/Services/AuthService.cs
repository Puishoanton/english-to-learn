using EnglishToLearn.Application.DTOs.User;
using EnglishToLearn.Application.Exceptions;
using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;
using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;

namespace EnglishToLearn.Application.Services
{
    public class AuthService(
        IUserRepository userRepository,
        IAuthTokenService authTokenService
        ) : IAuthService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IAuthTokenService _authTokenService = authTokenService;

        public async Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginDto googleLoginDto, HttpResponse response)
        {
            GoogleJsonWebSignature.Payload payload;

            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(googleLoginDto.IdToken);
            }
            catch (InvalidJwtException)
            {
                throw new BadRequestException("Invalid Google ID token.");
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

            string refreshToken = _authTokenService.GenerateTokensAndSetCookies(user, response);

            user.RefreshToken = refreshToken;
            await _userRepository.UpdateAsync(user);

            return new AuthResponseDto
            {
                Email = user.Email,
            };
        }

        public async Task<AuthResponseDto> RefreshTokensAsync(string? refreshToken, HttpResponse response)
        {
            try
            {
                _authTokenService.GetPrincipalFromToken(refreshToken);
            }
            catch
            {
                throw new BadRequestException("Invalid refresh token.");
            }

            User? user = await _userRepository.GetByRefreshTokenAsync(refreshToken);
            if (user is null || user.RefreshToken != refreshToken)
            {
                if (user is not null)
                {
                    user.RefreshToken = null;
                    await _userRepository.UpdateAsync(user);
                }

                throw new BadRequestException("Invalid refresh token.");
            }

            string newRefreshToken = _authTokenService.GenerateTokensAndSetCookies(user, response);

            user.RefreshToken = newRefreshToken;
            await _userRepository.UpdateAsync(user);

            return new AuthResponseDto
            {
                Email = user.Email,
            };
        }

        public async Task LogoutAsync(string refreshToken, HttpResponse response)
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

            _authTokenService.DeleteCookies(response);
        }

    }
}
