namespace Video.DAL.Repositories.Implementation
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Models.Dto.Comments;

    public class CommentsRepository : BaseRepository, ICommentsRepository
    {
        public CommentsRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }

        public async Task<IEnumerable<CommentDto>> GetVideoComments(int videoId)
        {
            return new List<CommentDto>();
        }

        public async Task<int> CreateComment(CreateCommentDto model)
        {
            return 1;
        }

        public async Task UpdateComment(UpdateCommentDto model)
        {
        }

        public async Task DeleteComment(int id)
        {
        }

        public async Task<bool> UserIsCommentOwner(int userId, int commentId)
        {
            return true;
        }
    }
}