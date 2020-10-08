namespace Video.BL.Services.Implementation
{
    using DAL.Repositories.Interfaces;
    using Interfaces;

    public class CommentsService : ICommentsService
    {
        private readonly ICommentsRepository _commentsRepository;

        public CommentsService(ICommentsRepository commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }
    }
}