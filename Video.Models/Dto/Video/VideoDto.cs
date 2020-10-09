namespace Video.Models.Dto.Video
{
    using System;

    public class VideoDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string LocationUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public int LengthInSeconds { get; set; }
        public bool IsPasswordProtected { get; set; }
        public DateTime CreatedDate { get; set; }
        public long FolderId { get; set; }
        public string ViewsCount { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}