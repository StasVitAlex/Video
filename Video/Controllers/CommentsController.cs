namespace Video.Controllers
{
    using System.Threading.Tasks;
    using BL.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using Models.ViewModels.Comments;

    public class CommentsController : BaseController
    {
        private readonly ICommentsService _commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }

        [HttpGet("by_video/{videoId}")]
        public async Task<IActionResult> GetVideoComments([FromRoute] int videoId)
        {
            return this.Ok(await _commentsService.GetVideoComments(videoId));
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentVm model)
        {
            model.UserId = this.CurrentUserId.Value;
            return this.Ok(await _commentsService.CreateComment(model));
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateComment([FromBody] UpdateCommentVm model)
        {
            model.UserId = this.CurrentUserId.Value;
            await _commentsService.UpdateComment(model);
            return this.Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int id)
        {
            await _commentsService.DeleteComment(this.CurrentUserId.Value, id);
            return this.Ok();
        }
    }
}