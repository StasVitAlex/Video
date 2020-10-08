namespace Video.BL.Services.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using DAL.Repositories.Interfaces;
    using Interfaces;
    using Models.Dto.Video;
    using Models.Enums;
    using Models.Exceptions;
    using Models.ViewModels.Video;

    public class VideoService : IVideoService
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IFoldersRepository _foldersRepository;
        private readonly IMapper _mapper;

        public VideoService(IVideoRepository videoRepository,
            IFoldersRepository foldersRepository,
            IMapper mapper)
        {
            _foldersRepository = foldersRepository;
            _videoRepository = videoRepository;
            _mapper = mapper;
        }

        public async Task<List<VideoVm>> GetVideosFromFolder(int userId, int folderId)
        {
            return _mapper.Map<List<VideoVm>>(await _videoRepository.GetVideosFromFolder(userId, folderId));
        }

        public async Task<VideoVm> GetVideoById(int userId, int videoId)
        {
            if (!await _videoRepository.IsUserHasAccessToVideo(userId, videoId))
                throw new AccessDeniedException();
            return _mapper.Map<VideoVm>(await _videoRepository.GetVideoById(videoId));
        }

        public async Task<int> CreateVideo(CreateVideoVm model)
        {
            if (!await _foldersRepository.UserHasAccessToFolder(model.UserId, model.FolderId))
                throw new AccessDeniedException();
            return await _videoRepository.CreateVideo(_mapper.Map<CreateVideoDto>(model));
        }

        public async Task LogVideoView(int? userId, int videoId)
        {
            await _videoRepository.LogVideoView(userId, videoId);
        }

        public async Task<VideoVm> GetVideoByLink(int? userId, string link)
        {
            var video = _mapper.Map<VideoVm>(await _videoRepository.GetVideoByLink(link));
            if (video == null)
                throw new NotFoundException();
            switch (video.VideoAccessType)
            {
                case VideoAccessType.Everyone:
                    return video;
                case VideoAccessType.None:
                case VideoAccessType.SignedInUsers:
                    if (!userId.HasValue || !await _videoRepository.IsUserHasAccessToVideo(userId.Value, video.Id))
                        throw new AccessDeniedException();
                    return video;
            }

            return video;
        }
    }
}