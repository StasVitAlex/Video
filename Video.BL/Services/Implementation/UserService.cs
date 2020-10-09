namespace Video.BL.Services.Implementation
{
    using System;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using AutoMapper;
    using DAL.Repositories.Interfaces;
    using Interfaces;
    using Microsoft.Graph;
    using Models.Dto.User;
    using Models.Exceptions;
    using Models.ViewModels.User;
    using RazorLight;
    using Utils.Extensions;

    public class UserService : IUserService
    {
        private readonly IEmailService _emailService;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly RazorLightEngine _razorLightEngine;

        public UserService(IUserRepository userRepository, IEmailService emailService,
            RazorLightEngine razorLightEngine,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _razorLightEngine = razorLightEngine;
            _emailService = emailService;
        }

        public async Task<UserVm> SignIn(SignInVm model)
        {
            var user = await _userRepository.SignIn(_mapper.Map<SignInDto>(model));
            if (user == null || !user.IsActive)
                throw new AccessDeniedException();
            return _mapper.Map<UserVm>(user);
        }

        public async Task<UserVm> SignUp(SignUpVm model)
        {
            var existingUser = await _userRepository.GetUserByEmail(model.Email);
            if (existingUser != null)
                throw new BadRequestException("User with this email is already exists");

            var signUpDto = _mapper.Map<SignUpDto>(model);
            var id = await _userRepository.SignUp(signUpDto);
            var body = await _razorLightEngine.CompileRenderAsync("UserInvitationTemplate.cshtml", new UserInvitationVm
            {
                Host = model.Host,
                ActivationToken = signUpDto.ActivationToken,
                FirstName = model.FirstName,
                LastName = model.LastName
            });
            _emailService.SendEmail(signUpDto.Email, $"Welcome to Video", body).Forget();
            var user = await _userRepository.GetUserById(id);
            return _mapper.Map<UserVm>(user);
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
                ActivationToken = Guid.NewGuid(),
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
                ActivationToken = Guid.NewGuid(),
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

        public async Task ActivateUser(Guid activationToken)
        {
            var user = await _userRepository.GetUserByActivationToken(activationToken);
            if (user.IsActive)
                throw new BadRequestException("User has been already activated");
            await _userRepository.ActivateUser(user.Id);
        }

        public async Task UpdateUser(int userId, UpdateUserVm model)
        {
            var updateUserDto = _mapper.Map<UpdateUserDto>(model);
            updateUserDto.Id = userId;
            await _userRepository.UpdateUser(updateUserDto);
        }
    }
}