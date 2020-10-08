namespace Video.Models.Dto.Video
{
    using Enums;

    public class CreateVideoDto
    {
        public string FileName { get; set; }
        public int FolderId { get; set; }
        public string Link { get; set; }
        public int UserId { get; set; }
        public string Extension { get; set; }
        public VideoAccessType VideoAccessType { get; set; }
    }
}