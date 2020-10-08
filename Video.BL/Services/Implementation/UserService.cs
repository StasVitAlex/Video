namespace Video.BL.Services.Implementation
{
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using AutoMapper;
    using DAL.Repositories.Interfaces;
    using Interfaces;
    using Microsoft.Graph;
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

        public async Task<UserVm> AuthenticateViaGoogleAccount(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            var user = await _userRepository.GetUserByEmail(payload.Email);
            if (user != null) return _mapper.Map<UserVm>(user);
            var userId = await _userRepository.SignUp(new SignUpDto
            {
                Email = payload.Email,
                FirstName = payload.GivenName,
                LastName = payload.FamilyName,
                OAuthSubject = payload.Subject,
                OAuthIssuer = payload.Issuer,
                IsExternalAuth = true
            });
            return new UserVm
            {
                Id = userId,
                Email = payload.Email,
                FirstName = payload.GivenName,
                LastName = payload.FamilyName
            };
        }

        public async Task<UserVm> AuthenticateViaMicrosoftAccount(MicrosoftAuthVm model)
        {
            var graphServiceClient = new GraphServiceClient(new DelegateAuthenticationProvider((requestMessage) =>
            {
                requestMessage
                    .Headers
                    .Authorization = new AuthenticationHeaderValue("Bearer", model.AccessToken);

                return Task.FromResult(0);
            }));
            var microsoftUser = await graphServiceClient.Me.Request().GetAsync();
            var user = await _userRepository.GetUserByEmail(microsoftUser.Mail);
            if (user != null) return _mapper.Map<UserVm>(user);
            var userId = await _userRepository.SignUp(new SignUpDto
            {
                Email = microsoftUser.Mail,
                FirstName = microsoftUser.GivenName,
                LastName = microsoftUser.Surname,
                IsExternalAuth = true
            });
            return new UserVm
            {
                Id = userId,
                Email = microsoftUser.Mail,
                FirstName = microsoftUser.GivenName,
                LastName = microsoftUser.Surname
            };
        }
    }
}