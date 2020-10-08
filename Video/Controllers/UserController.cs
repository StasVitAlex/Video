namespace Video.Controllers
{
    using System.Threading.Tasks;
    using BL.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

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
    }
}