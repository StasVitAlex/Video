namespace Video.Models.Dto.User
{
    using System;

    public class SignUpDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string OAuthSubject { get; set; }
        public string OAuthIssuer { get; set; }
        public bool IsExternalAuth { get; set; }
        public Guid ActivationToken { get; set; }
    }
}