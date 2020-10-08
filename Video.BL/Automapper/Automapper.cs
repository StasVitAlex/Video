namespace Video.BL.Automapper
{
    using AutoMapper;
    using Models.Dto.User;
    using Models.ViewModels.User;
    using Newtonsoft.Json;

    public class Automapper
    {
        public static IMapper RegisterMapper()
        {
            var jsonSettings = new JsonSerializerSettings {Error = (se, ev) => { ev.ErrorContext.Handled = true; }};
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserDto, UserVm>();
                cfg.CreateMap<SignUpVm, SignUpDto>();
                cfg.CreateMap<SignInVm, SignInDto>();
            });
            config.CompileMappings();
            return config.CreateMapper();
        }
    }
}