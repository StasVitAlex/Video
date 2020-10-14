namespace Video.Models.Dto.Video
{
    using System;

    public class VideoDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public long FolderId { get; set; }
        public string LocationUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public int Duration { get; set; }
        public bool IsPasswordProtected { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UniqueViews { get; set; }
        public int ViewsCount { get; set; }
        public int LinkId { get; set; }
        public string LinkCode { get; set; }
        public string LinkUrl { get; set; }
        public string LinkPassword { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserImageThumbnailUrl { get; set; }
    }
}