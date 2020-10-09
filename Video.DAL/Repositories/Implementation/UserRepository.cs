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
                $@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email, is_active as IsActive from users where email_address = '{model.Email}' and password = '{model.Password.GetSha1Hash()}'");
        }

        public async Task<int> SignUp(SignUpDto model)
        {
            model.Password = model.IsExternalAuth ? string.Empty : model.Password.GetSha1Hash();
            return await ExecuteScalarAsync<int>(
                $@"insert into users (user_name,password,first_name,last_name,email_address,is_external_auth,is_active,is_pwd_reset_required,tenant_id, activation_token) VALUES (@Email,@Password, @FirstName,@LastName,@Email,@IsExternalAuth, false, false, {GET_TENANT_QUERY}, @ActivationToken) RETURNING id",
                model);
        }

        public async Task<UserDto> GetUserById(int userId)
        {
            return await GetAsync<UserDto>($@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email, is_active as IsActive  from users where id = {userId}");
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
            await ExecuteActionAsync($@"update users  set first_name = @FirstName, last_name = @LastName where id = @Id", model);
        }
    }
}