namespace Video.Models.ViewModels.Video
{
    using System;
    using Enums;

    public class VideoActivityVm
    {
        public int? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageThumbnailUrl { get; set; }
        public long VideoId { get; set; }
        public UserActionType UserActionType { get; set; }
        public DateTime ActionDate { get; set; }
    }
}