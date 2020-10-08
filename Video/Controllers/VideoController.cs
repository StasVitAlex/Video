namespace Video.Controllers
{
    using System.IO;
    using System.Threading.Tasks;
    using BL.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    public class VideoController : BaseController
    {
        private readonly IVideoService _videoService;

        public VideoController(IVideoService videoService)
        {
            _videoService = videoService;
        }

        [HttpPost("upload_file"), RequestSizeLimit(1000000)]
        public async Task<IActionResult> UploadFile()
        {
            var file = Request.Form.Files[0];
            if (file.Length <= 0) return this.Ok();
            await using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            var image = stream.ToArray();
            return this.Ok();
        }
    }
}