namespace Video.Models.Dto.Video
{
    using System;
    using Enums;

    public class VideoActivityDto
    {
        public long Id { get; set; }
        public int? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageThumbnailUrl { get; set; }
        public long VideoId { get; set; }
        public UserActionType UserActionType { get; set; }
        public DateTime ActionDate { get; set; }
    }
}