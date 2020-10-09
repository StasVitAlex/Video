namespace Video.Models.Dto.Video
{

    public class CreateVideoDto
    {
        public string FileName { get; set; }
        public long FolderId { get; set; }
        public string Link { get; set; }
        public int UserId { get; set; }
        public string Extension { get; set; }
    }
}