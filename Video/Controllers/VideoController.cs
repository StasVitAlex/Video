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
    using Utils.Extensions;

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

            var createModel = new CreateVideoVm
                {UserId = this.CurrentUserId.Value, FileName = file.FileName, FolderId = folderId, Link = StringExtensions.GenerateUniqueRandomToken(), Extension = Path.GetExtension(file.FileName), VideoAccessType = VideoAccessType.None};

            var fileId = await _videoService.CreateVideo(createModel);
            await using (var fileStream = new FileStream(Path.Combine(_appEnvironment.ContentRootPath, _commonSettings.VideoFolder, $"{fileId}.{createModel.Extension}"), FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return this.Ok();
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
        public async Task<IActionResult> GetVideoStreamById([FromRoute] string link)
        {
            var video = await _videoService.GetVideoByLink(this.CurrentUserId, link);
            return PhysicalFile(Path.Combine(_appEnvironment.ContentRootPath, _commonSettings.VideoFolder, $"{video.Id}.{video.Extension}"), "application/octet-stream", enableRangeProcessing: true);
        }

        [HttpGet("by_folder/{folderId}")]
        public async Task<IActionResult> GetVideosFromFolder([FromRoute] int folderId)
        {
            return this.Ok(await _videoService.GetVideosFromFolder(this.CurrentUserId.Value, folderId));
        }

        [HttpPost("log_action")]
        [AllowAnonymous]
        public async Task<IActionResult> LogVideoAAction([FromBody] LogVideoActionVm model)
        {
            await _videoService.LogVideoAction(model);
            return this.Ok();
        }
    }
}