namespace Video.Utils.Helpers
{
    using System.Diagnostics;
    using System.IO;
    using System;
    using System.Runtime.InteropServices;

    public static class VideoHelpers
    {
        private static string GetPath(string baseUrl)
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                return Path.Combine(baseUrl, "ffmpeg", "ffmpeg.exe");
            }

            if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX) || RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                return Path.Combine(baseUrl, "ffmpeg", "ffmpeg");
            }

            throw new Exception("Unsupported platform.");
        }

        public static void GenerateThumbNail(string baseUrl, string sourceFileName, string outputThumbnailPath)
        {
            var test = $"{outputThumbnailPath}1";
            var procStartInfo = new ProcessStartInfo("ffmpeg")
            {
                FileName = GetPath(baseUrl),
                Arguments = $"-y -i {sourceFileName} -ss 00:00:0.5 -vframes 1 -vf scale=540x380 {outputThumbnailPath}",
                CreateNoWindow = true,
                UseShellExecute = false,
            };

            using var process = new Process { StartInfo = procStartInfo };
            process.Start();
            process.WaitForExit();
        }
    }
}