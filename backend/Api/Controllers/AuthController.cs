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
            AuthResponseDto response = await _authService.GoogleLoginAsync(googleLoginDto, Response);
            return Ok(new { email = response.Email, message = "Login successful" });
        }

        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshTokensAsync()
        {
            string? refreshToken = Request.Cookies["refreshToken"];

            AuthResponseDto response = await _authService.RefreshTokensAsync(refreshToken, Response);
            return Ok(new { email = response.Email, message = "Refresh successful" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            string? refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
            {
                throw new UnauthorizedException("Refresh token is required.");
            }
            await _authService.LogoutAsync(refreshToken, Response);
            return Ok(new { message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("get-me")]
        public IActionResult GetMe()
        {
            return Ok(new { message = "Logout successful" });
        }
    }
}
