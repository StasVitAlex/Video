namespace Video.Controllers
{
    using System.Threading.Tasks;
    using BL.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using Models.ViewModels.Folders;

    public class FoldersController : BaseController
    {
        private readonly IFoldersService _foldersService;

        public FoldersController(IFoldersService foldersService)
        {
            _foldersService = foldersService;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetFolders([FromQuery] int? parentFolderId)
        {
            return this.Ok(await _foldersService.GetUserFolders(this.CurrentUserId, parentFolderId));
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateFolder([FromBody] CreateFolderVm model)
        {
            return this.Ok(await _foldersService.CreateFolder(this.CurrentUserId, model));
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateFolder([FromBody] UpdateFolderVm model)
        {
            await _foldersService.UpdateFolder(this.CurrentUserId, model);
            return this.Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFolder([FromRoute] int id)
        {
            await _foldersService.DeleteFolder(this.CurrentUserId, id);
            return this.Ok();
        }
    }
}