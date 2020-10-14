namespace Video.Models.ViewModels.Link
{
    using System;
    using Enums;

    public class CreateVideoLinkVm
    {
        public long VideoId { get; set; }
        public long FolderId { get; set; }
        public VideoAccessType CommentsAccessType { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string LinkPassword { get; set; }
    }
}
