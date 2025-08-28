using EnglishToLearn.Application.DTOs.User;
using EnglishToLearn.Application.Exceptions;
using EnglishToLearn.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishToLearn.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        private readonly IAuthService _authService = authService;

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto googleLoginDto)
        {
            AuthResponseDto response = await _authService.GoogleLoginAsync(googleLoginDto);
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshTokensAsync()
        {
            string? refreshToken = Request.Headers["X-Refresh-Token"].FirstOrDefault();

            AuthResponseDto response = await _authService.RefreshTokensAsync(refreshToken);
            
            return Ok(response);
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            string? refreshToken = Request.Headers["X-Refresh-Token"].FirstOrDefault();

            if (string.IsNullOrEmpty(refreshToken))
            {
                throw new UnauthorizedException("Refresh token is required.");
            }
            await _authService.LogoutAsync(refreshToken);
            return Ok();
        }
    }
}
