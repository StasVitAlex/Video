namespace Video.DAL.Repositories.Implementation
{
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Models.Dto.User;

    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }

        public async Task<UserDto> SignIn(SignInDto model)
        {
            return new UserDto {Email = "test@test.com", UserId = 1};
        }

        public Task SignUp(SignUpDto model)
        {
            return Task.CompletedTask;
        }

        public async Task<UserDto> GetUserById(int userId)
        {
            return new UserDto {Email = "test@test.com", UserId = 1};
        }
    }
}