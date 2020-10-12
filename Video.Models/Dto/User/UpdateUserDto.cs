namespace Video.Models.Dto.User
{
    public class UpdateUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageLocalUrl { get; set; }
        public string ImageThumbnailUrl { get; set; }
        public string ImageCode { get; set; }
        public int Id { get; set; }
    }
}