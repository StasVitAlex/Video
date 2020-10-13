namespace Video.Utils.Helpers
{
    using System.Diagnostics;
    using System.IO;
    using System;
    using System.Linq;
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
            var procStartInfo = new ProcessStartInfo("ffmpeg")
            {
                FileName = GetPath(baseUrl),
                Arguments = $"-y -i {sourceFileName} -ss 00:00:0.5 -vframes 1 -vf scale=540x380 {outputThumbnailPath}",
                CreateNoWindow = true,
                UseShellExecute = false,
            };

            using var process = new Process {StartInfo = procStartInfo};
            process.Start();
            process.WaitForExit();
        }

        public static int GetVideoDuration(string baseUrl, string sourceFileName)
        {
            var output = string.Empty;
            var procStartInfo = new ProcessStartInfo("ffmpeg")
            {
                FileName = GetPath(baseUrl),
                Arguments = "-i " + sourceFileName + " -f null -",
                RedirectStandardOutput = true,
                WindowStyle = ProcessWindowStyle.Hidden,
                UseShellExecute = false,
                RedirectStandardError = true,
                RedirectStandardInput = true
            };

            Process ischk;
            ischk = System.Diagnostics.Process.Start(procStartInfo);
            ischk.WaitForExit();
            var ischkout = ischk.StandardOutput;
            ischk.WaitForExit();
            if (ischk.HasExited)
            {
                output = ischkout.ReadToEnd();
            }

            var isError = ischk.StandardError;
            ischk.WaitForExit();
            if (ischk.HasExited)
            {
                output = isError.ReadToEnd();
            }

            if (string.IsNullOrEmpty(output))
                return 0;
            var index= output.LastIndexOf("Duration: ");
            var durationOutput = output.Substring(index, 18).Split(" ").LastOrDefault();
            var time = TimeSpan.Parse(durationOutput);
            return Convert.ToInt32(time.TotalSeconds);
        }
    }
}