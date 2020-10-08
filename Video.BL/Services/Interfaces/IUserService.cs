namespace Video.BL.Services.Interfaces
{
    using System.Threading.Tasks;
    using Models.ViewModels.User;

    public interface IUserService
    {
        Task<UserVm> SignIn(SignInVm model);
        Task SignUp(SignUpVm model);
        Task<UserVm> GetUserById(int userId);
        Task<UserVm> AuthenticateViaGoogleAccount(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload);
    }
}