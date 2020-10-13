namespace Video.Utils.Helpers
{
    using System.Diagnostics;
    using System.IO;

    public static class VideoHelpers
    {
        public static void GenerateThumbNail(string baseUrl, string sourceFileName, string outputThumbnailPath)
        {
            var test = $"{outputThumbnailPath}1";
            var procStartInfo = new ProcessStartInfo("ffmpeg")
            {
                FileName = Path.Combine(baseUrl, "ffmpeg", "ffmpeg.exe"),
                Arguments = $"-y -i {sourceFileName} -ss 00:00:0.5 -vframes 1 -vf scale=540x380 {outputThumbnailPath}",
                CreateNoWindow = true,
                UseShellExecute = false,
            };

            using (var process = new Process { StartInfo = procStartInfo })
            {
                process.Start();
                process.WaitForExit();
            }
        }
    }
}