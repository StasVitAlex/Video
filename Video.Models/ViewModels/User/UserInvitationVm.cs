namespace Video.Models.ViewModels.User
{
    using System;

    public class UserInvitationVm
    {
        public Guid ActivationToken { get; set; }
        public string Host { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}