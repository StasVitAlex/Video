namespace Video.Models.ViewModels.Video
{
    using Enums;

    public class LogVideoActionVm
    {
        public int? UserId { get; set; }
        public long VideoId { get; set; }
        public UserActionType UserActionType { get; set; }
    }
}