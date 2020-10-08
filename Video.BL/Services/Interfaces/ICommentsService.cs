namespace Video.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models.ViewModels.Comments;

    public interface ICommentsService
    {
        Task<List<CommentVm>> GetVideoComments(int videoId);
        Task<int> CreateComment(CreateCommentVm model);
        Task UpdateComment(UpdateCommentVm model);
        Task DeleteComment(int userId,int id);
    }
}