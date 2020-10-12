namespace Video.Models.ViewModels.Video
{
    using System.IO;
    using Enums;

    public class CreateVideoVm
    {
        public string FileName { get; set; }
        public int FolderId { get; set; }
        public string LinkCode { get; set; }
        public string LinkUrl { get; set; }
        public int UserId { get; set; }
        public string Extension { get; set; }
        public Stream VideoFile { get; set; }
        public VideoAccessType VideoAccessType { get; set; }
    }
}