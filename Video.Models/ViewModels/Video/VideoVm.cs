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
        public int UniqueViews { get; set; }
        public int ViewsCount { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string LinkCode { get; set; }
        public VideoAccessType CommentsAccessType { get; set; }
        public int Duration { get; set; }
    }
}