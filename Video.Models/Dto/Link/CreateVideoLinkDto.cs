namespace Video.Models.Dto.Link
{
    using Enums;

    public class CreateVideoLinkDto
    {
        public long VideoId { get; set; }
        public long FolderId { get; set; }
        public LinkType LinkType { get; set; }
        public string LinkUrl { get; set; }
        public string LinkCode { get; set; }
    }
}
