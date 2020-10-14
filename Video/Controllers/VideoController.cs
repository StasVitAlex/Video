namespace Video.Controllers
{
    using System.IO;
    using System.Threading.Tasks;
    using BL.Services.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Models.Enums;
    using Models.ViewModels.Video;
    using Video.Models.ViewModels.Link;


    public class VideoController : BaseController
    {
        private readonly IVideoService _videoService;
        private readonly CommonSettings _commonSettings;
        private readonly IWebHostEnvironment _appEnvironment;

        public VideoController(IVideoService videoService, IOptions<CommonSettings> settings,
            IWebHostEnvironment appEnvironment)
        {
            _videoService = videoService;
            _commonSettings = settings.Value;
            _appEnvironment = appEnvironment;
        }

        [HttpPost("upload_video/{folderId}")]
        public async Task<IActionResult> UploadVideo([FromRoute] int folderId)
        {
            var file = Request.Form.Files[0];
            if (file.Length <= 0) return this.Ok();
            var extension = Path.GetExtension(file.FileName);
            var createModel = new CreateVideoVm
            {
                UserId = this.CurrentUserId.Value,
                FileName = file.FileName.Substring(0, file.FileName.Length - extension.Length),
                FolderId = folderId,
                Extension = extension,
                VideoFile = file.OpenReadStream(),
                VideoAccessType = VideoAccessType.None
            };
            var videoId = await _videoService.CreateVideo(this.CurrentUserId.Value, createModel, _appEnvironment.ContentRootPath);

            return this.Ok(videoId);
        }

        [HttpGet("{videoId}")]
        public async Task<IActionResult> GetById([FromRoute] int videoId)
        {
            return this.Ok(await _videoService.GetVideoById(this.CurrentUserId.Value, videoId));
        }

        [HttpGet("by_link/{link}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByLink([FromRoute] string link)
        {
            return this.Ok(await _videoService.GetVideoByLink(this.CurrentUserId, link));
        }

        [HttpGet("stream/{link}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetVideoStreamByLink([FromRoute] string link)
        {
            var video = await _videoService.GetVideoByLink(this.CurrentUserId, link);
            var extension = Path.GetExtension(video.LocationUrl);
            return PhysicalFile(Path.Combine(_appEnvironment.ContentRootPath, _commonSettings.UserVideosFolder, $"{video.Id}{extension}"), "application/octet-stream", enableRangeProcessing: true);
        }

        [HttpGet("stream_by_id/{videoId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetVideoStreamById([FromRoute] long videoId)
        {
            var video = await _videoService.GetVideoById(null, videoId);
            var extension = Path.GetExtension(video.LocationUrl);
            return PhysicalFile(Path.Combine(_appEnvironment.ContentRootPath, _commonSettings.UserVideosFolder, $"{video.Id}{extension}"), "application/octet-stream", enableRangeProcessing: true);
        }

        [HttpGet("by_folder/{folderId}")]
        public async Task<IActionResult> GetVideosByFolder([FromRoute] int folderId, [FromQuery] GetVideosVm model)
        {
            return this.Ok(await _videoService.GetVideosByFolder(this.CurrentUserId.Value, folderId, model));
        }

        [HttpDelete("{videoId}")]
        public async Task<IActionResult> ArchiveVideo([FromRoute] int videoId)
        {
            await _videoService.ArchiveVideo(videoId, this.CurrentUserId.Value);
            return this.Ok();
        }

        [HttpPost("log_action")]
        [AllowAnonymous]
        public async Task<IActionResult> LogVideoAction([FromBody] LogVideoActionVm model)
        {
            await _videoService.LogVideoAction(model);
            return this.Ok();
        }

        [AllowAnonymous]
        [HttpGet("thumbnail/{videoId}")]
        public async Task<IActionResult> GetVideoImage([FromRoute] long videoId)
        {
            if (!await _videoService.VideoExists(videoId))
                return this.Ok();
            return PhysicalFile(Path.Combine(_appEnvironment.ContentRootPath, _commonSettings.VideoImagesFolder, $"{videoId}.png"), "application/octet-stream", enableRangeProcessing: true);
        }

        [HttpGet("activity/{videoId}")]
        public async Task<IActionResult> GetVideoActivity([FromRoute] long videoId)
        {
            return this.Ok(await _videoService.GetVideoActivity(videoId));
        }

        [HttpPost("share_link")]
        public async Task<IActionResult> ShareVideoLink([FromBody] CreateVideoLinkVm model)
        {
            return this.Ok(await _videoService.ShareVideoLink(this.CurrentUserId.Value, model));
        }
    }
}