namespace Video.DAL.Repositories.Implementation
{
    using System;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Options;
    using Models.Configuration;
    using Models.Dto.User;
    using Utils.Helpers;

    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IOptions<DatabaseConfiguration> dataConfiguration) : base(dataConfiguration)
        {
        }

        public async Task<UserDto> SignIn(SignInDto model)
        {
            return await GetAsync<UserDto>(
                $@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email,image_thumbnail_url as ImageThumbnailUrl  is_active as IsActive from users where email_address = '{model.Email}' and password = '{model.Password.GetSha1Hash()}'");
        }

        public async Task<int> SignUp(SignUpDto model)
        {
            model.Password = model.IsExternalAuth ? string.Empty : model.Password.GetSha1Hash();
            var thirdPartyAuthType = model.ThirdPartyAuthType.HasValue ? ((int) model.ThirdPartyAuthType).ToString() : "''";
            return await ExecuteScalarAsync<int>(
                $@"insert into users (user_name,password,first_name,last_name,email_address,is_external_auth,is_active,is_pwd_reset_required,tenant_id, activation_token,third_party_authenticator_id) VALUES (@Email,@Password, @FirstName,@LastName,@Email,@IsExternalAuth, false, false, {GET_TENANT_QUERY}, @ActivationToken, {thirdPartyAuthType}) RETURNING id",
                model);
        }

        public async Task<UserDto> GetUserById(int userId)
        {
            return await GetAsync<UserDto>(
                $@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email, is_active as IsActive, image_thumbnail_url as ImageThumbnailUrl, image_local_url as ImageLocalUrl  from users where id = {userId}");
        }
        
        public async Task<UserDto> GetUserByImageCode(string imageCode)
        {
            return await GetAsync<UserDto>(
                $@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email, is_active as IsActive, image_thumbnail_url as ImageThumbnailUrl, image_local_url as ImageLocalUrl  from users where image_code = '{imageCode}'");
        }

        public async Task<UserDto> GetUserByEmail(string email)
        {
            return await GetAsync<UserDto>($@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email, is_active as IsActive from users where email_address = '{email}'");
        }

        public async Task<UserDto> GetUserByActivationToken(Guid activationToken)
        {
            return await GetAsync<UserDto>(
                $@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email, is_active as IsActive from users where activation_token = '{activationToken}'");
        }

        public async Task<UserDto> ActivateUser(int id)
        {
            return await GetAsync<UserDto>($@"update users set is_active = true where id = {id}");
        }

        public async Task UpdateUser(UpdateUserDto model)
        {
            var query = $@"update users  set first_name = '{model.FirstName}', last_name = '{model.LastName}' " + (!string.IsNullOrEmpty(model.ImageLocalUrl) ? $", image_local_url = '{model.ImageLocalUrl}' " : string.Empty)
                                                                                                                 + (!string.IsNullOrEmpty(model.ImageThumbnailUrl) ? $", image_thumbnail_url = '{model.ImageThumbnailUrl}' " : string.Empty)
                                                                                                                 + (!string.IsNullOrEmpty(model.ImageCode) ? $", image_code = '{model.ImageCode}' " : string.Empty) + $" where id = {model.Id}";
            await ExecuteActionAsync(query, model);
        }
    }
}