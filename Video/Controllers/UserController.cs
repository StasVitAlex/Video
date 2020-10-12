namespace Video.Controllers
{
    using System;
    using System.Threading.Tasks;
    using BL.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using Models.ViewModels.User;
    using Microsoft.AspNetCore.Authorization;

    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById([FromRoute] int userId)
        {
            return this.Ok(await _userService.GetUserById(userId));
        }

        [AllowAnonymous]
        [HttpGet("image/{imageCode}")]
        public async Task<IActionResult> GetUserImage([FromRoute] string imageCode)
        {
            var user = await _userService.GetUserByImageCode(imageCode);
            if (user == null)
                return this.Ok();
            return PhysicalFile(user.ImageLocalUrl, "application/octet-stream", true);
        }

        [AllowAnonymous]
        [HttpPost("activate/{activationToken}")]
        public async Task<IActionResult> GetById([FromRoute] Guid activationToken)
        {
            await _userService.ActivateUser(activationToken);
            return this.Ok();
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateUser([FromForm] UpdateUserVm model)
        {
            return this.Ok(await _userService.UpdateUser(this.CurrentUserId.Value, model));
        }
    }
}