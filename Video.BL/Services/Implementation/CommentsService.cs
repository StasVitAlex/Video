namespace Video.BL.Services.Implementation
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using DAL.Repositories.Interfaces;
    using Interfaces;
    using Models.Dto.Comments;
    using Models.Exceptions;
    using Models.ViewModels.Comments;

    public class CommentsService : ICommentsService
    {
        private readonly ICommentsRepository _commentsRepository;
        private readonly IMapper _mapper;

        public CommentsService(ICommentsRepository commentsRepository,
            IMapper mapper)
        {
            _commentsRepository = commentsRepository;
            _mapper = mapper;
        }

        public async Task<List<CommentVm>> GetVideoComments(int videoId)
        {
            return _mapper.Map<List<CommentVm>>(await _commentsRepository.GetVideoComments(videoId));
        }

        public async Task<int> CreateComment(CreateCommentVm model)
        {
            return await _commentsRepository.CreateComment(_mapper.Map<CreateCommentDto>(model));
        }

        public async Task UpdateComment(UpdateCommentVm model)
        {
            if (!await _commentsRepository.UserIsCommentOwner(model.UserId, model.Id))
                throw new AccessDeniedException("User can't edit comment");
            await _commentsRepository.UpdateComment(_mapper.Map<UpdateCommentDto>(model));
        }

        public async Task DeleteComment(int userId, int id)
        {
            if (!await _commentsRepository.UserIsCommentOwner(userId, id))
                throw new AccessDeniedException("User can't edit comment");
            await _commentsRepository.DeleteComment(id);
        }
    }
}