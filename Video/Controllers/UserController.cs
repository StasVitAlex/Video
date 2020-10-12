namespace Video.Controllers
{
    using System;
    using System.IO;
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
        [HttpPost("activate/{activationToken}")]
        public async Task<IActionResult> GetById([FromRoute] Guid activationToken)
        {
            await _userService.ActivateUser(activationToken);
            return this.Ok();
        }

        [HttpPost("update_image"), RequestSizeLimit(1000000)]
        public async Task<IActionResult> UpdateImage()
        {
            var file = Request.Form.Files[0];
            if (file.Length <= 0) return this.Ok();
            await using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            var image = stream.ToArray();
            return this.Ok();
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateUser([FromForm] UpdateUserVm model)
        {
            await _userService.UpdateUser(this.CurrentUserId.Value, model);
            return this.Ok();
        }
    }
}