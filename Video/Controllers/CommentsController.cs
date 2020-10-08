namespace Video.Controllers
{
    using BL.Services.Interfaces;

    public class CommentsController : BaseController
    {
        private readonly ICommentsService _commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }
    }
}