namespace Video.Models.ViewModels.Video
{
    using System;
    using Enums;

    public class VideoVm
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int FolderId { get; set; }
        public string LocationUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UniqueVies { get; set; }
        public string ViewsCount { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public VideoAccessType VideoAccessType { get; set; }
    }
}