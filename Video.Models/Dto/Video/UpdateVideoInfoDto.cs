namespace Video.Models.Dto.Video
{
    public class UpdateVideoInfoDto
    {
        public string LocationUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public long Id { get; set; }
        public int Duration { get; set; }
    }
}