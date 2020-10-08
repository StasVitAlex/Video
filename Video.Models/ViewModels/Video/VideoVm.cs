namespace Video.Models.ViewModels.Video
{
    using System;
    using Enums;

    public class VideoVm
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int FolderId { get; set; }
        public string Link { get; set; }
        public int UserId { get; set; }
        public string Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ViewsCount { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public VideoAccessType VideoAccessType { get; set; }
    }
}