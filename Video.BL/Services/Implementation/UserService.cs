namespace Video.BL.Services.Implementation
{
    using System.Threading.Tasks;
    using AutoMapper;
    using DAL.Repositories.Interfaces;
    using Interfaces;
    using Models.Dto.User;
    using Models.ViewModels.User;

    public class UserService : IUserService
    {
        private readonly IEmailService _emailService;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IEmailService emailService,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task<UserVm> SignIn(SignInVm model)
        {
            return _mapper.Map<UserVm>(await _userRepository.SignIn(_mapper.Map<SignInDto>(model)));
        }

        public async Task SignUp(SignUpVm model)
        {
            await _userRepository.SignUp(_mapper.Map<SignUpDto>(model));
            //send email
        }

        public async Task<UserVm> GetUserById(int userId)
        {
            return _mapper.Map<UserVm>(await _userRepository.GetUserById(userId));
        }
    }
}