namespace Video.BL.Services.Implementation
{
    using DAL.Repositories.Interfaces;
    using Interfaces;

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
    }
}