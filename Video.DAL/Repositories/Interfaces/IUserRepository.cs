namespace Video.DAL.Repositories.Interfaces
{
    using System;
    using System.Threading.Tasks;
    using Models.Dto.User;

    public interface IUserRepository
    {
        Task<UserDto> SignIn(SignInDto model);
        Task<int> SignUp(SignUpDto model);
        Task<UserDto> GetUserById(int userId);
        Task<UserDto> GetUserByEmail(string email);
        Task<UserDto> GetUserByActivationToken(Guid activationToken);
        Task<UserDto> ActivateUser(int id);
    }
}