namespace Video.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using BL.Services.Interfaces;
    using FluentValidation;
    using Google.Apis.Auth;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using Models.Configuration;
    using Models.ViewModels.User;

    public class AuthController : BaseController
    {
        private readonly IUserService _userService;
        private readonly TokenConfiguration _tokenConfiguration;

        public AuthController(IUserService userService,
            IOptions<TokenConfiguration> tokenConf)
        {
            _userService = userService;
            _tokenConfiguration = tokenConf.Value;
        }

        private string GenerateJwt(UserVm user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            };
            var claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(_tokenConfiguration.Issuer,
                _tokenConfiguration.Audience,
                notBefore: now,
                claims: claimsIdentity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(_tokenConfiguration.LifeTime)),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenConfiguration.Key)), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        [AllowAnonymous]
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInVm model)
        {
            var user = await _userService.SignIn(model);
            if (user == null)
                throw new ValidationException("Invalid username or password");
            return this.Ok(new
            {
                Token = this.GenerateJwt(user),
                Id = user.UserId
            });
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpVm model)
        {
            await _userService.SignUp(model);
            return this.Ok();
        }

        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<IActionResult> GoogleAuth([FromBody] GoogleSignInVm userView)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(userView.TokenId, new GoogleJsonWebSignature.ValidationSettings());
            if (payload == null)
                return this.BadRequest("Invalid token");
            var user = await _userService.AuthenticateViaGoogleAccount(payload);
            return this.Ok(new
            {
                Token = this.GenerateJwt(user),
                Id = user.UserId
            });
        }

        [AllowAnonymous]
        [HttpPost("microsoft")]
        public async Task<IActionResult> MicrosoftAuth([FromBody] MicrosoftAuthVm model)
        {
            var user = await _userService.AuthenticateViaMicrosoftAccount(model);
            return this.Ok(new
            {
                Token = this.GenerateJwt(user),
                Id = user.UserId
            });
        }
    }
}