namespace Video.BL.Services.Implementation
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using AutoMapper;
    using DAL.Repositories.Interfaces;
    using Interfaces;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Graph;
    using Models.Dto.User;
    using Models.Exceptions;
    using Models.ViewModels.User;
    using RazorLight;
    using Utils.Extensions;
    using Microsoft.Extensions.Options;
    using Models.Dto.Folders;
    using Models.Enums;
    using Video.Models.Configuration;
    using Directory = System.IO.Directory;

    public class UserService : IUserService
    {
        private readonly IEmailService _emailService;
        private readonly IUserRepository _userRepository;
        private readonly IFoldersRepository _foldersRepository;
        private readonly IMapper _mapper;
        private readonly RazorLightEngine _razorLightEngine;
        private readonly CommonSettings _commonSettings;
        private readonly IWebHostEnvironment _appEnvironment;

        public UserService(IUserRepository userRepository, IEmailService emailService,
            IWebHostEnvironment appEnvironment,
            IFoldersRepository foldersRepository,
            RazorLightEngine razorLightEngine,
            IMapper mapper, IOptions<CommonSettings> commonSettings)
        {
            _userRepository = userRepository;
            _appEnvironment = appEnvironment;
            _foldersRepository = foldersRepository;
            _mapper = mapper;
            _razorLightEngine = razorLightEngine;
            _emailService = emailService;
            _commonSettings = commonSettings.Value;
        }

        public async Task<UserVm> SignIn(SignInVm model)
        {
            var user = await _userRepository.SignIn(_mapper.Map<SignInDto>(model));
            if (user == null)
                throw new BadRequestException("Invalid email or password");
            if (!user.IsActive)
                throw new BadRequestException("User is not active, please activate user via email");
            return _mapper.Map<UserVm>(user);
        }

        public async Task SignUp(SignUpVm model)
        {
            var existingUser = await _userRepository.GetUserByEmail(model.Email);
            if (existingUser != null)
                throw new BadRequestException("User with this email is already exists");

            var signUpDto = _mapper.Map<SignUpDto>(model);
            var id = await _userRepository.SignUp(signUpDto);
            //create user root folder
            await _foldersRepository.CreateFolder(new CreateFolderDto
            {
                Name = $"User {id}  root folder",
                UserId = id,
                FolderType = FolderType.Private
            });
            var body = await _razorLightEngine.CompileRenderAsync("UserInvitationTemplate.cshtml", new UserInvitationVm
            {
                ActivationUrl = $"{_commonSettings.ApplicationUrl}/activate_user",
                ActivationToken = signUpDto.ActivationToken,
                FirstName = model.FirstName,
                LastName = model.LastName
            });
            _emailService.SendEmail(signUpDto.Email, $"Welcome to Video", body).Forget();
        }

        public async Task<UserVm> GetUserById(int userId)
        {
            return _mapper.Map<UserVm>(await _userRepository.GetUserById(userId));
        }

        public async Task<UserVm> GetUserByImageCode(string imageCode)
        {
            return _mapper.Map<UserVm>(await _userRepository.GetUserByImageCode(imageCode));
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
                IsExternalAuth = true,
                ThirdPartyAuthType = ThirdPartyAuthType.Google
            });
            //create user root folder
            await _foldersRepository.CreateFolder(new CreateFolderDto
            {
                Name = $"User {userId}  root folder",
                UserId = userId,
                FolderType = FolderType.Private
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
                ThirdPartyAuthType = ThirdPartyAuthType.Microsoft,
                IsExternalAuth = true
            });
            //create user root folder
            await _foldersRepository.CreateFolder(new CreateFolderDto
            {
                Name = $"User {userId}  root folder",
                UserId = userId
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

        public async Task<UserVm> UpdateUser(int userId, UpdateUserVm model)
        {
            var updateUserDto = new UpdateUserDto
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Id = userId
            };
            var file = model.Image;
            if (file != null)
            {
                var extension = "." + file.FileName.Split(".").LastOrDefault();
                if (string.IsNullOrEmpty(extension))
                    extension = string.Empty;
                var imagesDirectory = Path.Combine(_appEnvironment.ContentRootPath, _commonSettings.UserImagesFolder);
                if (!Directory.Exists(imagesDirectory))
                    Directory.CreateDirectory(imagesDirectory);
                updateUserDto.ImageLocalUrl = Path.Combine(imagesDirectory, $"{userId}{extension}");
                await using var fileStream = new FileStream(updateUserDto.ImageLocalUrl, FileMode.Create);
                await file.CopyToAsync(fileStream);
                updateUserDto.ImageCode = StringExtensions.GenerateUniqueRandomToken();
                updateUserDto.ImageThumbnailUrl = $"{_commonSettings.ApplicationUrl}/api/user/image/{updateUserDto.ImageCode}";
            }

            await _userRepository.UpdateUser(updateUserDto);
            return await this.GetUserById(userId);
        }
    }
}