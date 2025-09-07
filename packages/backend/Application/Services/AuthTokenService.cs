using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;
using Microsoft.IdentityModel.Tokens;


namespace EnglishToLearn.Application.Services
{
    public class AuthTokenService(IConfiguration configuration) : IAuthTokenService
    {
        private readonly IConfiguration _configuration = configuration;
        private readonly SymmetricSecurityKey _accessTokenSigningKey = new(
            Encoding.UTF8.GetBytes(configuration["Jwt:AccessTokenSecretKey"] ??
                                   throw new InvalidOperationException("Jwt:AccessTokenSecretKey not found."))
        );
        private readonly SymmetricSecurityKey _refreshTokenSigningKey = new(
            Encoding.UTF8.GetBytes(configuration["Jwt:RefreshTokenSecretKey"] ??
                                   throw new InvalidOperationException("Jwt:RefreshTokenSecretKey not found."))
        );

        public string GenerateTokensAndSetCookies(User user, HttpResponse response)
        {
            Claim[] accessClaims =
            [
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            ];

            JwtSecurityToken accessToken = new(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: accessClaims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: new SigningCredentials(_accessTokenSigningKey, SecurityAlgorithms.HmacSha256)
                );

            JwtSecurityToken refreshToken = new(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: new SigningCredentials(_refreshTokenSigningKey, SecurityAlgorithms.HmacSha256)
                );

            string accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);
            string refreshTokenString = new JwtSecurityTokenHandler().WriteToken(refreshToken);

            SetCookie(response, nameof(accessToken), accessTokenString, TimeSpan.FromMinutes(15));
            SetCookie(response, nameof(refreshToken), refreshTokenString, TimeSpan.FromDays(30));

            return refreshTokenString;
        }

        public ClaimsPrincipal GetPrincipalFromToken(string? token)
        {
            JwtSecurityTokenHandler tokenHandler = new();

            TokenValidationParameters validationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,

                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
                IssuerSigningKey = _refreshTokenSigningKey
            };

            SecurityToken securityToken;
            ClaimsPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        public void DeleteCookies(HttpResponse response)
        {
            CookieOptions cookieOptions = new()
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(-1),
                SameSite = SameSiteMode.Strict,
                Path = "/"
            };
            response.Cookies.Append("accessToken", string.Empty, cookieOptions);
            response.Cookies.Append("refreshToken", string.Empty, cookieOptions);
        }

        private static void SetCookie(HttpResponse response, string key, string value, TimeSpan maxAge)
        {
            CookieOptions cookieOptions = new()
            {
                HttpOnly = true,
                Secure = true,
                MaxAge = maxAge,
                SameSite = SameSiteMode.Strict,
                Path = "/"
            };
            response.Cookies.Append(key, value, cookieOptions);
        }
    }
}
