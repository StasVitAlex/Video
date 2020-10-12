namespace Video.BL.Services.Implementation
{
    using System.IO;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using DAL.Repositories.Interfaces;
    using Interfaces;
    using Models.Dto.Video;
    using Models.Enums;
    using Models.Exceptions;
    using Models.ViewModels.Video;
    using Microsoft.Extensions.Options;
    using Video.Models.Configuration;
    using Video.Utils.Helpers;

    public class VideoService : IVideoService
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IFoldersRepository _foldersRepository;
        private readonly IMapper _mapper;
        private readonly CommonSettings _commonSettings;

        public VideoService(IVideoRepository videoRepository,
            IFoldersRepository foldersRepository,
            IMapper mapper, IOptions<CommonSettings> settings)
        {
            _foldersRepository = foldersRepository;
            _videoRepository = videoRepository;
            _mapper = mapper;
            _commonSettings = settings.Value;
        }

        public async Task<List<VideoVm>> GetVideosFromFolder(int userId, long folderId)
        {
            return _mapper.Map<List<VideoVm>>(await _videoRepository.GetVideosFromFolder(userId, folderId));
        }

        public async Task<VideoVm> GetVideoById(int userId, long videoId)
        {
            if (!await _videoRepository.IsUserHasAccessToVideo(userId, videoId))
                throw new AccessDeniedException();
            return _mapper.Map<VideoVm>(await _videoRepository.GetVideoById(videoId));
        }

        public async Task<long> CreateVideo(long userId, CreateVideoVm model, string basePath)
        {
            if (!await _foldersRepository.UserHasAccessToFolder(model.UserId, model.FolderId))
                throw new AccessDeniedException();
            model.LinkUrl = $"{_commonSettings.ApplicationUrl}/video/{model.LinkCode}";
            var videoId = await _videoRepository.CreateVideo(userId, _mapper.Map<CreateVideoDto>(model));
            var videoFileDestinationPath =
                Path.Combine(basePath, _commonSettings.UserVideosFolder, $"{videoId}{model.Extension}");
            await using (var fileStream = new FileStream(videoFileDestinationPath, FileMode.Create))
            {
                await model.VideoFile.CopyToAsync(fileStream);
            }

            var thumbnailDestinationPath = Path.Combine(basePath, _commonSettings.UserImagesFolder, $"{videoId}");
            VideoHelpers.GenerateThumbNail(videoFileDestinationPath, thumbnailDestinationPath);
            var thumbnailUrl = $"{_commonSettings.ApplicationUrl}/video/thumbnail/{model.LinkCode}";
            return await _videoRepository.UpdateVideoUrls(videoFileDestinationPath, thumbnailUrl);
        }

        public async Task LogVideoAction(LogVideoActionVm model)
        {
            await _videoRepository.LogVideoAction(model.UserId, model.VideoId,model.VideoActionType);
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