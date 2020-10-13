namespace Video.Models.Dto.Video
{
    public class LinkPermissionDto
    {
        public long Id { get; set; }

        public int? TenantId { get; set; }

        public int? UserId { get; set; }
    }
}
