namespace Video.DAL.Repositories.Implementation
{
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
            return await GetAsync<UserDto>($@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email from public.users where email_address = '{model.Email}' and password = '{model.Password.GetSha1Hash()}'");
        }

        public async Task<int> SignUp(SignUpDto model)
        {
            model.Password = model.IsExternalAuth ? string.Empty : model.Password.GetSha1Hash();
            return await ExecuteScalarAsync<int>(
                $@"INSERT INTO public.users (user_name,password,first_name,last_name,email_address,is_external_auth,is_active,is_pwd_reset_required,created_date,last_update_date,tenant_id) VALUES (@Email,@Password, @FirstName,@LastName,@Email,@IsExternalAuth, false, false, now(), now(), 1) RETURNING id",
                model);
        }

        public async Task<UserDto> GetUserById(int userId)
        {
            return await GetAsync<UserDto>($@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email  from public.users where id = {userId}");
        }

        public async Task<UserDto> GetUserByEmail(string email)
        {
            return await GetAsync<UserDto>($@"select id as Id, user_name as UserName,first_name as FirstName,last_name as LastName, email_address as Email from public.users where email_address = '{email}'");
        }
    }
}