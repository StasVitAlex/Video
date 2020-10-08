namespace Video.DAL.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.Dto.Comments;

    public interface ICommentsRepository
    {
        Task<IEnumerable<CommentDto>> GetVideoComments(int videoId);
        Task<int> CreateComment(CreateCommentDto model);
        Task UpdateComment(UpdateCommentDto model);
        Task DeleteComment(int id);
        Task<bool> UserIsCommentOwner(int userId, int commentId);
    }
}