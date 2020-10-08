namespace Video.DAL.Repositories.Interfaces
{
    using System.Threading.Tasks;
    using Models.Dto.User;

    public interface IUserRepository
    {
        Task<UserDto> SignIn(SignInDto model);
        Task SignUp(SignUpDto model);
        Task<UserDto> GetUserById(int userId);
    }
}