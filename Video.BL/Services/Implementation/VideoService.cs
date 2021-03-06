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
    using Video.Models.ViewModels.Link;
    using Video.Utils.Extensions;
    using Video.Models.Dto.Link;

    public class VideoService : IVideoService
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IFoldersRepository _foldersRepository;
        private readonly IILinkRepository _linkRepository;
        private readonly IMapper _mapper;
        private readonly CommonSettings _commonSettings;

        public VideoService(IVideoRepository videoRepository,
            IFoldersRepository foldersRepository, IILinkRepository linkRepository,
            IMapper mapper, IOptions<CommonSettings> settings)
        {
            _foldersRepository = foldersRepository;
            _videoRepository = videoRepository;
            _linkRepository = linkRepository;
            _mapper = mapper;
            _commonSettings = settings.Value;
        }

        public async Task<List<VideoVm>> GetVideosByFolder(int userId, long folderId, GetVideosVm model)
        {
            return _mapper.Map<List<VideoVm>>(await _videoRepository.GetVideosFromFolder(userId, folderId, model.IsArchived));
        }

        public async Task<VideoVm> GetVideoById(int? userId, long videoId)
        {
            if (userId.HasValue && !await _videoRepository.IsUserHasAccessToVideo(userId.Value, videoId))
                throw new AccessDeniedException();
            var video = await _videoRepository.GetVideoById(videoId);
            if (video == null)
                throw new NotFoundException();

            return _mapper.Map<VideoVm>(video);
        }

        public async Task<long> CreateVideo(long userId, CreateVideoVm model, string basePath)
        {
            if (!await _foldersRepository.UserHasAccessToFolder(model.UserId, model.FolderId))
                throw new AccessDeniedException();
            model.LinkCode = StringExtensions.GenerateUniqueRandomToken();
            model.LinkUrl = $"{_commonSettings.ApplicationUrl}/api/video/stream/{model.LinkCode}";
            var videoId = await _videoRepository.CreateVideo(userId, _mapper.Map<CreateVideoDto>(model));
            var userVideoFolder = Path.Combine(basePath, _commonSettings.UserVideosFolder);
            if (!Directory.Exists(userVideoFolder))
                Directory.CreateDirectory(userVideoFolder);
            var videoFileDestinationPath = Path.Combine(userVideoFolder, $"{videoId}{model.Extension}");
            await using (var fileStream = new FileStream(videoFileDestinationPath, FileMode.Create))
            {
                await model.VideoFile.CopyToAsync(fileStream);
            }

            var videoImagesFolder = Path.Combine(basePath, _commonSettings.VideoImagesFolder);
            if (!Directory.Exists(videoImagesFolder))
                Directory.CreateDirectory(videoImagesFolder);
            var thumbnailDestinationPath = Path.Combine(videoImagesFolder, $"{videoId}.png");
            VideoHelpers.GenerateThumbNail(basePath, videoFileDestinationPath, thumbnailDestinationPath);
            var duration = VideoHelpers.GetVideoDuration(basePath, videoFileDestinationPath);
            await _videoRepository.UpdateVideoInfo(new UpdateVideoInfoDto {Duration = duration,ThumbnailUrl = $"{_commonSettings.ApplicationUrl}/api/video/thumbnail/{videoId}", Id = videoId, LocationUrl = videoFileDestinationPath});
            return videoId;
        }

        public async Task LogVideoAction(LogVideoActionVm model)
        {
            await _videoRepository.LogVideoAction(model.UserId, model.VideoId, model.UserActionType);
        }

        public async Task<VideoVm> GetVideoByLink(int? userId, string link)
        {
            var video = await _videoRepository.GetVideoByLink(link);
            if (video == null)
                throw new NotFoundException();

            var commentsPermissions = await _linkRepository.GetVideoLinkPermission(video.LinkId, VideoPermissionType.Comment);
            var videoVm = _mapper.Map<VideoVm>(video);
            videoVm.CommentsAccessType = GetAccessType(commentsPermissions);
            return videoVm;
        }

        private static VideoAccessType GetAccessType(LinkPermissionDto linkPermissions)
        {
            if (linkPermissions == null)
            {
                return VideoAccessType.None;
            }

            return linkPermissions.TenantId.HasValue ? VideoAccessType.SignedInUsers : VideoAccessType.Everyone;
        }

        public async Task ArchiveVideo(long videoId, int userId)
        {
            if (!await _videoRepository.IsUserVideoOwner(videoId, userId))
                throw new AccessDeniedException();
            await _videoRepository.ArchiveVideo(videoId);
        }

        public async Task<List<VideoActivityVm>> GetVideoActivity(long videoId)
        {
            return _mapper.Map<List<VideoActivityVm>>(await _videoRepository.GetVideoActivity(videoId));
        }

        public async Task<string> ShareVideoLink(int userId, CreateVideoLinkVm model)
        {
            if (!await _videoRepository.IsUserVideoOwner(userId, model.VideoId))
                throw new AccessDeniedException();

            return await _linkRepository.GetLink(userId, model.VideoId, model.LinkPassword, model.ExpiryDate) ??
                       await _linkRepository.CreateVideoLink(userId, _mapper.Map<CreateVideoLinkDto>(model));
        }

        public async Task<bool> VideoExists(long videoId)
        {
            return await _videoRepository.Exists(videoId);
        }
    }
}