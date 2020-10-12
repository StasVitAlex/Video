namespace Video.Models.Dto.User
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public string ImageLocalUrl { get; set; }
        public string ImageThumbnailUrl { get; set; }
    }
}