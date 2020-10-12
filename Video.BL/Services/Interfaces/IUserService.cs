namespace Video.BL.Services.Interfaces
{
    using System;
    using System.Threading.Tasks;
    using Models.ViewModels.User;

    public interface IUserService
    {
        Task<UserVm> SignIn(SignInVm model);
        Task SignUp(SignUpVm model);
        Task<UserVm> GetUserById(int userId);
        Task<UserVm> GetUserByImageCode(string imageCode);
        Task<UserVm> AuthenticateViaGoogleAccount(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload);
        Task<UserVm> AuthenticateViaMicrosoftAccount(MicrosoftAuthVm model);
        Task ActivateUser(Guid activationToken);
        Task<UserVm> UpdateUser(int userId, UpdateUserVm model);
    }
}